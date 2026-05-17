/**
 * Adds missing Auth.js variables to .env.local.
 * Usage: node scripts/setup-auth-env.mjs [admin-password]
 */
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env.local");
const password = process.argv[2] || "HimayaAdmin2026!";

function hasKey(content, key) {
  return new RegExp(`^${key}=`, "m").test(content);
}

function appendLine(content, key, value) {
  if (hasKey(content, key)) return content;
  const line = `${key}=${value}`;
  return content.endsWith("\n") || content.length === 0 ? `${content}${line}\n` : `${content}\n${line}\n`;
}

let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";

if (!hasKey(content, "AUTH_SECRET") && !hasKey(content, "NEXTAUTH_SECRET")) {
  const secret = randomBytes(32).toString("base64url");
  content = appendLine(content, "AUTH_SECRET", secret);
  content = appendLine(content, "NEXTAUTH_SECRET", secret);
  console.log("Added AUTH_SECRET and NEXTAUTH_SECRET");
} else {
  console.log("AUTH_SECRET or NEXTAUTH_SECRET already present — skipped");
}

if (!hasKey(content, "NEXTAUTH_URL") && !hasKey(content, "AUTH_URL")) {
  content = appendLine(content, "NEXTAUTH_URL", "http://localhost:3000");
  console.log("Added NEXTAUTH_URL=http://localhost:3000");
}

if (!hasKey(content, "ADMIN_EMAIL")) {
  content = appendLine(content, "ADMIN_EMAIL", "admin@himaya.uk");
  console.log("Added ADMIN_EMAIL=admin@himaya.uk");
}

if (!hasKey(content, "ADMIN_PASSWORD_HASH")) {
  const hash = bcrypt.hashSync(password, 12);
  content = appendLine(content, "ADMIN_PASSWORD_HASH", hash);
  console.log("Added ADMIN_PASSWORD_HASH (bcrypt)");
  console.log(`\nAdmin login:\n  Email:    admin@himaya.uk\n  Password: ${password}\n`);
  console.log("Change this password after first login by generating a new hash:");
  console.log('  node -e "import(\'bcryptjs\').then(b=>console.log(b.hashSync(\'YOUR_PASSWORD\',12)))"');
} else {
  console.log("ADMIN_PASSWORD_HASH already present — skipped");
}

writeFileSync(envPath, content, "utf8");
console.log(`\nUpdated ${envPath}. Restart the dev server (npm run dev).`);
