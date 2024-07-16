import { getIronSession, IronSessionData } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import { earnPerTap } from '@/constants';
import db from '@/libs/firestore';
import { sessionOptions } from '@/libs/session';
import { doc, getDoc, increment, updateDoc } from '@firebase/firestore';

type Data = {
  isSuccess: boolean;
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
  const userDocRef = doc(db, "users", `${session.tgChatId}`);
  const energyDoc = await getDoc(energyDocRef);
  const userDoc = await getDoc(userDocRef);
  if (energyDoc.exists() && userDoc.exists()) {
    const energy = energyDoc.data().energy;
    if (energy > 0) {
      const point = earnPerTap[session.level];
      await updateDoc(energyDocRef, {
        energy: increment(-point),
      });
      await updateDoc(userDocRef, {
        coins: increment(point),
      });
      res.status(200).json({ isSuccess: true });
      return;
    }
  }
  res.status(200).json({ isSuccess: false });
}
