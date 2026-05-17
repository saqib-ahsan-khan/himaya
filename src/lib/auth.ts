import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/** Auth.js v5 prefers AUTH_SECRET; NEXTAUTH_SECRET is supported for compatibility. */
const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

if (!authSecret && process.env.NODE_ENV !== "test") {
  console.error(
    "[auth] Missing AUTH_SECRET (or NEXTAUTH_SECRET). Run: npm run auth:setup — see .env.example"
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL?.trim();
        const adminHash = process.env.ADMIN_PASSWORD_HASH?.trim();

        if (!authSecret) {
          throw new Error("Auth is not configured: set AUTH_SECRET in .env.local");
        }
        if (!adminEmail || !adminHash) {
          throw new Error("Admin login is not configured: set ADMIN_EMAIL and ADMIN_PASSWORD_HASH");
        }
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email !== adminEmail) return null;

        const valid = await bcrypt.compare(credentials.password as string, adminHash);
        if (!valid) return null;

        return {
          id: "1",
          email: adminEmail,
          name: "HIMAYA Admin",
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
