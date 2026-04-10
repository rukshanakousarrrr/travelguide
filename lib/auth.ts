import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // Email + password credentials (admin login only)
    Credentials({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.email) return null;

        // Admin-only credentials login
        if (user.role !== "ADMIN") return null;

        // Admin password is stored in env (single admin account)
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminPasswordHash) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          adminPasswordHash
        );
        if (!valid) return null;

        return user;
      },
    }),
  ],

  session: {
    strategy: "database",
  },

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id   = user.id;
        session.user.role = (user as { role: "ADMIN" | "CUSTOMER" }).role;
      }
      return session;
    },

    async signIn({ user, account }) {
      // Block credential sign-in for non-admins
      if (account?.provider === "credentials") {
        return true; // already validated in authorize()
      }

      // Google OAuth — allow customers only
      // Admin uses credentials, not OAuth
      return true;
    },
  },

  pages: {
    signIn:  "/auth/login",
    error:   "/auth/error",
  },
});
