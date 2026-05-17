import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { HIMAYA_SYSTEM_PROMPT } from "@/lib/himaya-knowledge";
import type { ApiChatMessage } from "@/types/chat";

export const runtime = "edge";

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

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: HIMAYA_SYSTEM_PROMPT,
      messages: recentMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

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
          console.error("Stream error:", err);
          controller.error(err);
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
