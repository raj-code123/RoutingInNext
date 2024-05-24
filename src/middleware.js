import { NextRequest, NextResponse } from "next/server";
import { sessionStatus } from "./utils/sessions";

const privateRoutes = ["/datatable","/"];

const publicRoutes = ["/login","/register","/forget-password","/reset-password"];

export default async  function middleware(req) {
  const Token = req?.cookies?._parsed?.get("userToken")?.value;
  if (req.nextUrl.pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith("/.next/")) {
    return NextResponse.next();
  }
  if( !Token && privateRoutes.includes(req.nextUrl.pathname)){
    const absoluteURL = new URL('/login',req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if( Token && publicRoutes.includes(req.nextUrl.pathname)){
    const absoluteURL = new URL('/datatable',req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
