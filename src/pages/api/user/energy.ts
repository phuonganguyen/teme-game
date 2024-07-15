import db from "@/libs/firestore";
import { sessionOptions } from "@/libs/session";
import { doc, getDoc } from "@firebase/firestore";
import { getIronSession, IronSessionData } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  energy: number;
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

  const energyDocRef = doc(db, "energies", `${session.tgChatId}`);
  const energyDoc = await getDoc(energyDocRef);
  if (energyDoc.exists()) {
    res.status(200).json({ energy: energyDoc.data().energy });
  } else {
    res.status(200).json({ energy: 0 });
  }
}
