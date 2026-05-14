import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

import {isLocale, localeCookieName, locales} from "./i18n/routing";

const legacyLocaleSet = new Set(locales);

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (!isLocale(firstSegment) || !legacyLocaleSet.has(firstSegment)) {
    return NextResponse.next();
  }

  const redirectedPath = `/${segments.slice(1).join("/")}` || "/";
  const normalizedPath = redirectedPath === "//" ? "/" : redirectedPath;
  const destination = new URL(normalizedPath, request.url);
  destination.search = request.nextUrl.search;

  const response = NextResponse.redirect(destination);
  response.cookies.set(localeCookieName, firstSegment, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
