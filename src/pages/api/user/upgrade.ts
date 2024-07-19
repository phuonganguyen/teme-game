import { getIronSession, IronSessionData } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import { catLevelUpMapper, earnPerTap } from '@/constants';
import db from '@/libs/firestore';
import { sessionOptions } from '@/libs/session';
import { Result } from '@/models';
import { doc, getDoc, increment, updateDoc } from '@firebase/firestore';

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
    const user = userDoc.data();
    const { coins, level } = user;
    const upLevelCoins = catLevelUpMapper[session.level];

    if (coins >= upLevelCoins) {
      await updateDoc(userDocRef, {
        coins: increment(-upLevelCoins),
        level: increment(1),
      });
      session.level = level + 1;
      await session.save();
      res.status(200).json({ isSuccess: true });
      return;
    }
  }
  res.status(200).json({ isSuccess: false });
}
