import { type DefaultSession } from "next-auth";
import { ApiUser } from "./ApiResponse";
declare module "next-auth" {
  interface Session {
    user: ApiUser & DefaultSession["user"];
    accessToken: string;
  }
}
