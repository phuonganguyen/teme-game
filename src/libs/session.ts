import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: "W1GzGZ7guafwag2tDJfr3dM3y948Bm0g",
  cookieName: "teme-coin",
  cookieOptions: {
    maxAge: undefined,
    secure: process.env.NODE_ENV === "production",
  },
};

interface Friend {
  id: string;
  username: string;
  coins: number;
  time: Date;
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    isLoggedIn: boolean;
    tgChatId: number;
    username: string;
    level: number;
    hash: string;
  }
}
