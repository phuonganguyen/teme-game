import { getIronSession, IronSessionData } from 'iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

import ages from '@/libs/ages.json';
import db from '@/libs/firestore';
import { sessionOptions } from '@/libs/session';
import { AgeResponse, Result } from '@/models';
import { doc, getDoc, increment, updateDoc } from '@firebase/firestore';

const ids = Object.keys(ages);
const nids = ids.map((e) => parseInt(e));

const minId = nids[0];
const maxId = nids[nids.length - 1];
const getDate = (id) => {
  if (id < minId) {
    return [-1, new Date(ages[ids[0]])];
  } else if (id > maxId) {
    return [1, new Date(ages[ids[ids.length - 1]])];
  } else {
    let lid = nids[0];
    for (let i = 0; i < ids.length; i++) {
      if (id <= nids[i]) {
        // calculate middle date
        const uid = nids[i];
        const lage = ages[lid];
        const uage = ages[uid];

        const idratio = (id - lid) / (uid - lid);
        const midDate = Math.floor(idratio * (uage - lage) + lage);
        return [0, new Date(midDate)];
      } else {
        lid = nids[i];
      }
    }
  }
};

const ageMapper: { [key: number]: number } = {
  1: 868,
  2: 1852,
  3: 2750,
  4: 3686,
  5: 4615,
  6: 5555,
  7: 6415,
  8: 7333,
  9: 8243,
  10: 9187,
  11: 10680,
};

const calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AgeResponse>
) {
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );

  const date = getDate(session.tgChatId);
  var age = calculateAge(date[1] as Date);
  const reward = ageMapper[age];

  const userDocRef = doc(db, "users", `${session.tgChatId}`);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists() && userDoc.data().firstClaimed == false) {
    await updateDoc(userDocRef, {
      firstClaimed: true,
      coins: increment(reward),
    });
  }

  res.status(200).json({ age, reward });
}
