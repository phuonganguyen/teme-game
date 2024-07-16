import { getIronSession, IronSessionData } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/libs/firestore';
import { sessionOptions } from '@/libs/session';
import { doc, getDoc } from '@firebase/firestore';

type Data = {
  energy: number;
  time: Date;
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
    const energy = energyDoc.data();
    res.status(200).json({ energy: energy.energy, time: energy.time });
  } else {
    res.status(200).json({ energy: 0, time: undefined });
  }
}
