import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { ApiUser } from "@/types/ApiResponse";
import { _login } from "@/lib/apiActions";

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
        try {
          const data = await _login(
            credentials?.email as string,
            credentials?.password as string
          );

          return {
            ...data.data.user,
            accessToken: data.data.accessToken,
          };
        } catch {
          return null;
        }
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
          user as ApiUser & { accessToken: string }
        ).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token.user as ApiUser,
        accessToken: token.accessToken,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
});
