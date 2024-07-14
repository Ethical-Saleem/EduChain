import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { Demo } from "./demo";

declare module "next-auth" {
        interface User {
          accessToken: string;
          user: Demo.User
          school: Demo.School
        }
  interface Session {
    accessToken?: string;
    user?: Demo.User,
    school?: Demo.School
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: Demo.User,
    school?: Demo.School
  }
}
