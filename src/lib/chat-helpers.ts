const USER_LEAD_TRIGGERS = [
  /pric(e|ing)/i,
  /cost/i,
  /how much/i,
  /book/i,
  /demo/i,
  /call/i,
  /eligible/i,
  /speak to someone/i,
  /talk to someone/i,
  /interested/i,
  /get started/i,
  /sign up/i,
];

const ASSISTANT_LEAD_TRIGGERS = [
  "take your details",
  "collect your",
  "follow up",
  "book a call",
  "speak to the team",
  "pass your details",
  "get in touch",
];

export function shouldShowLeadCaptureFromUser(text: string): boolean {
  return USER_LEAD_TRIGGERS.some((re) => re.test(text));
}

export function shouldShowLeadCaptureFromAssistant(text: string): boolean {
  const lower = text.toLowerCase();
  return ASSISTANT_LEAD_TRIGGERS.some((phrase) => lower.includes(phrase));
}

export function shouldShowBookDemoShortcut(text: string): boolean {
  const lower = text.toLowerCase();
  return ["book", "demo", "call", "readiness", "schedule"].some((w) => lower.includes(w));
}

export function getFollowUpSuggestions(content: string): string[] {
  const lower = content.toLowerCase();

  if (lower.includes("atlas")) {
    return ["How does ATLAS detect drift?", "What does Audit Mode produce?"];
  }
  if (lower.includes("pricing") || lower.includes("£") || lower.includes("month")) {
    return ["What's included in HIMAYA Regulated?", "Are there long-term contracts?"];
  }
  if (lower.includes("control drift") || lower.includes("drift")) {
    return ["What causes control drift?", "How quickly can HIMAYA detect it?"];
  }
  if (lower.includes("onboarding") || lower.includes("onboard")) {
    return ["How long does onboarding take?", "What do I need to prepare?"];
  }

  return [];
}

export const WELCOME_SUGGESTIONS = [
  "What does HIMAYA do?",
  "What is control drift?",
  "How much does HIMAYA cost?",
  "Is my firm eligible?",
];
