import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginResponse, User } from "@/types/ApiResponse";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data: LoginResponse = await res.json();

        if (!res.ok || !data.success) {
          return null;
        }

        return {
          ...data.data.user,
          accessToken: data.data.accessToken,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user);

        token.user = user;
        token.accessToken = (
          user as User & { accessToken: string }
        ).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token.user as User,
        accessToken: token.accessToken,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
});
