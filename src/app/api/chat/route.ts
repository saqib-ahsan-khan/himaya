import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { HIMAYA_SYSTEM_PROMPT } from "@/lib/himaya-knowledge";
import type { ApiChatMessage } from "@/types/chat";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): Response | null {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (limit && now < limit.resetTime) {
    if (limit.count >= 30) {
      return new Response(
        JSON.stringify({
          error: "You've reached the chat limit for now. Please email hello@himaya.uk or book a call.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    limit.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 });
  }

  return null;
}

const CHAT_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

function anthropicErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "error" in error) {
    const nested = (error as { error?: { message?: string } }).error;
    if (nested?.message) return nested.message;
  }
  if (error instanceof Error) return error.message;
  return "Chat service unavailable.";
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const rateLimited = checkRateLimit(ip);
    if (rateLimited) return rateLimited;

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: "Chat service not configured." }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages } = (await req.json()) as { messages?: ApiChatMessage[] };

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const recentMessages = messages.slice(-20).filter((m) => m.role === "user" || m.role === "assistant");

    let stream;
    try {
      stream = client.messages.stream({
        model: CHAT_MODEL,
        max_tokens: 600,
        system: HIMAYA_SYSTEM_PROMPT,
        messages: recentMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });
    } catch (error) {
      const message = anthropicErrorMessage(error);
      console.error("Chat API error:", message);
      return new Response(JSON.stringify({ error: message }), {
        status: 402,
        headers: { "Content-Type": "application/json" },
      });
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              const data = JSON.stringify({ text: chunk.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const message = anthropicErrorMessage(err);
          console.error("Stream error:", message);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Chat service unavailable. Please email hello@himaya.uk directly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
