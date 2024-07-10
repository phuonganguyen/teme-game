import db from "@/libs/firestore";
import { sessionOptions } from "@/libs/session";
import Result from "@/types/result";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "@firebase/firestore";
import { getIronSession, IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  try {
    const { taskId, reward } = req.body;
    const session = await getIronSession<IronSessionData>(
      req,
      res,
      sessionOptions
    );
    const usersRef = doc(db, "users", `${session.tgChatId}`);
    const usersSnap = await getDoc(usersRef);
    if (usersSnap.exists()) {
      await updateDoc(usersRef, {
        tasks: arrayUnion({
          id: `${taskId}`,
          reward: reward,
          time: Date.now(),
          claimed: true,
        }),
        coins: increment(reward),
      });
      res.status(200).json({ isSuccessful: true });
    }
  } catch (ex) {
    res.status(200).json({ isSuccessful: false, message: JSON.stringify(ex) });
  }
}
