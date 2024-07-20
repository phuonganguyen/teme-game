import { getIronSession, IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

import { rewardPerHour } from "@/constants";
import db from "@/libs/firestore";
import { sessionOptions } from "@/libs/session";
import { Result } from "@/models";
import { doc, getDoc, increment, updateDoc } from "@firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );

  const userDocRef = doc(db, "users", `${session.tgChatId}`);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    if (userDoc.data().earnedPerHour == false) {
      const amount = rewardPerHour[session.level];
      await updateDoc(userDocRef, {
        earnedPerHour: true,
        coins: increment(amount),
      });
    }
  } else {
    res.status(401).json({ isSuccess: false });
  }
}
