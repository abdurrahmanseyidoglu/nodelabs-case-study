import { ApiUser } from "./ApiResponse";
declare module "next-auth" {
  interface Session {
    user: ApiUser;
   
  }
}
