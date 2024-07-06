// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { IronSessionData, getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";
import db from "@/libs/firestore";
import { doc, getDoc, setDoc } from "@firebase/firestore";

const TOKEN = "7373895404:AAGeYJytxdito2MjyYJOdVvn7oizQeNQIkE";

type Data = {
  isLoggedIn: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { telegramInitData } = req.body;
  const initData = new URLSearchParams(telegramInitData);
  const tgHash = initData.get("hash") as string;
  const tgUser = JSON.parse(initData.get("user") || "");
  const isVerified = await verifyWebAppOpenByTelegram(TOKEN, initData);
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );
  if (isVerified) {
    const userRef = doc(db, "users", `${tgUser.id}`);
    const userSnap = await getDoc(userRef);
    let user = null;
    if (userSnap.exists()) {
      user = userSnap.data();
      session.isLoggedIn = true;
      session.tgChatId = tgUser.id;
      session.username = user.username;
      session.level = user.level;
      session.coins = user.coins;
      session.friends = user.friends;
      session.hash = tgHash;

      await session.save();
      res.status(200).json({ isLoggedIn: true });
      return;
    }
  }

  session.destroy();
  await session.save();
  res.status(200).json({ isLoggedIn: false });
}

const verifyWebAppOpenByTelegram = async (
  botToken: string,
  initData: URLSearchParams
) => {
  const dataCheckString: string[] = [];
  const authDate = Number(initData.get("auth_date"));
  initData.sort();

  initData.forEach((value, key) => {
    key !== "hash" && dataCheckString.push(`${key}=${value}`);
  });

  const secret = CryptoJS.HmacSHA256(botToken, "WebAppData");
  const checkHash = CryptoJS.HmacSHA256(
    dataCheckString.join("\n"),
    secret
  ).toString(CryptoJS.enc.Hex);

  return (
    initData.get("hash") === checkHash && Date.now() / 1000 - authDate <= 10
  );
};
