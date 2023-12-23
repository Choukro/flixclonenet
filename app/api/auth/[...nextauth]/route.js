import NextAuth from "next-auth/next";
import { authConfig } from "./option.js";

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST, handler as DELETE };
