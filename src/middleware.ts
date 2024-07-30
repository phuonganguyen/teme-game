import { getIronSession, IronSessionData } from "iron-session";
import { NextFetchEvent, NextResponse } from "next/server";

import { sessionOptions } from "./libs/session";

import type { NextRequest } from "next/server";
export const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  const res = NextResponse.next();
  const { pathname, searchParams, locale } = req.nextUrl;

  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );
  const { hash, tgChatId } = session;

  if (hash === undefined || tgChatId === undefined) {
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${pathname}${searchParams}`, req.url)
    ); // redirect to /unauthorized page
  }

  await session.save();

  return res;
};

export const config = {
  matcher: ["/", "/battle", "/connect", "/friends", "/task"],
};
