import db from "@/libs/firestore";
import { sessionOptions } from "@/libs/session";
import { TaskResponse } from "@/types/task";
import { doc, getDoc } from "@firebase/firestore";
import { getIronSession, IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  tasks: TaskResponse[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );

  const userDocRef = doc(db, "users", `${session.tgChatId}`);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    res.status(200).json({ tasks: userDoc.data().tasks });
  } else {
    res.status(200).json({ tasks: [] });
  }
}
