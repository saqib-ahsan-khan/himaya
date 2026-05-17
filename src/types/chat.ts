export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatLead {
  name: string;
  company: string;
  email: string;
  concern: string;
  collected: boolean;
}

export type ChatState = "idle" | "typing" | "streaming" | "error";

export type ApiChatMessage = {
  role: "user" | "assistant";
  content: string;
};
