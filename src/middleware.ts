import { IronSessionData, getIronSession } from "iron-session";
import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionOptions } from "./libs/session";

export const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  const res = NextResponse.next();
  const { pathname, searchParams, locale } = req.nextUrl;

  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );
  const { user } = session;

  if (
    user === undefined ||
    user.hash === undefined ||
    user.tgChatId === undefined
  ) {
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${pathname}${searchParams}`, req.url)
    ); // redirect to /unauthorized page
  }

  await session.save();

  return res;
};

export const config = {
  matcher: ["/"],
};
