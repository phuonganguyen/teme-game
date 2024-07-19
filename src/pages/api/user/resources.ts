import { getIronSession, IronSessionData } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import db from '@/libs/firestore';
import { sessionOptions } from '@/libs/session';
import { GetUserResourcesResponse } from '@/models';
import { doc, getDoc } from '@firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserResourcesResponse>
) {
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );
  const userDocRef = doc(db, "users", `${session.tgChatId}`);
  const userDoc = await getDoc(userDocRef);
  const energyDocRef = doc(db, "energies", `${session.tgChatId}`);
  const energyDoc = await getDoc(energyDocRef);
  if (userDoc.exists() && energyDoc.exists()) {
    const energy = energyDoc.data();
    const coins = userDoc.data().coins;
    res.status(200).json({
      energy: {
        energy: energy.energy,
        time: energy.time.toDate(),
        level: energy.level,
      },
      coins,
    });
  } else {
    res.status(401).json({ energy: null, coins: 0 });
  }
}
