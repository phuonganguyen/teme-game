import db from "@/libs/firestore";
import { sessionOptions } from "@/libs/session";
import Result from "@/types/result";
import { doc, getDoc, increment, updateDoc } from "@firebase/firestore";
import { getIronSession, IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
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
      const tasks = await usersSnap.data().tasks;
      if (tasks && tasks.length) {
        var newTasks = tasks.map((task: any) => {
          if (task.id.toString() === taskId) {
            return { ...task, claimed: true };
          }

          return task;
        });
        await updateDoc(usersRef, {
          tasks: newTasks,
          coins: increment(reward),
        });

        res.status(200).json({ isSuccessful: true, newTasks });
      }
    }
  } catch (ex) {
    res.status(200).json({ isSuccessful: false, message: JSON.stringify(ex) });
  }
}
