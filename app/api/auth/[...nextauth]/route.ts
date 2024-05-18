import { authOptions } from "@/app/libs/authOptions";
import NextAuth  from "next-auth";


const handler = NextAuth(authOptions)

export const GET = handler;
export const POST = handler;