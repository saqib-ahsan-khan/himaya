import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config (no Node-only deps). Used by middleware.
 * Credentials + bcrypt live in auth.ts for API/sign-in routes only.
 */
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: { strategy: "jwt" },
  providers: [],
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
} satisfies NextAuthConfig;
