import { NextApiRequest, NextApiResponse } from 'next';
import { Context, Markup, Telegraf } from 'telegraf';

import { energyByLevel } from '@/constants';
import db from '@/libs/firestore';
import {
    arrayUnion, doc, getDoc, increment, setDoc, Timestamp, updateDoc
} from '@firebase/firestore';

const SECRET_HASH = "BQmLdGYERo3PY9dn2HQjsgWfV4t04F";
const BOT_TOKEN = "7373895404:AAGeYJytxdito2MjyYJOdVvn7oizQeNQIkE";
const bot = new Telegraf(BOT_TOKEN);

export async function handleOnMessage(ctx: Context) {
  const reply = `Hello! Welcome to TEMECOIN 🐈\nThe first Player pump player(PPP)  meme AI gaming and Restaking & Rwa Built on @ton_blockchain💎\nTap the screen, collect coins, Up a level, Lucky Spin, battle pump up your passive income, and Become the pioneer Set To DOMINATE All Memes!\nWe’ll definitely appreciate your efforts once the token is listed (the dates are coming soon).\nDon't forget about your friends — bring them to the game and get even more coins together!`;

  await ctx.reply(
    reply,
    Markup.inlineKeyboard([
      [
        Markup.button.url(
          "Subscribe to the channel",
          "https://t.me/Temecoinxyz"
        ),
      ],
      [
        Markup.button.url(
          "Follow Twitter channel",
          "https://x.com/Temecoinxyz"
        ),
      ],
      [
        Markup.button.url(
          "Subscribe Youtube channel",
          "https://youtube.com/@Temecoinxyz "
        ),
      ],
      [Markup.button.webApp("PLAY  NOW", "https://game.temecoin.xyz")],
    ])
  );
}

bot.start(async (ctx) => {
  const { args, message } = ctx;

  const { id, is_premium, username } = message.from;
  try {
    const userDocRef = doc(db, "users", `${id}`);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      let coins = 0;
      let friends = [];
      if (args.length > 0) {
        const refId = args[0];

        const refDocRef = doc(db, "users", refId);
        if (refId !== id.toString()) {
          const refDoc = await getDoc(refDocRef);
          if (refDoc.exists()) {
            coins = is_premium ? 10000 : 2500;
            const ref = refDoc.data();
            const newCoins = is_premium ? 25000 : 5000;
            friends.push({
              id: refId,
              username: ref.username,
              coins: coins,
              time: Date.now(),
            });

            await updateDoc(refDocRef, {
              coins: increment(newCoins),
              friends: arrayUnion({
                id: `${id}`,
                username: username,
                coins: newCoins,
                time: Date.now(),
              }),
            });
          }
        }
      }

      await setDoc(
        userDocRef,
        {
          username: username,
          coins: coins,
          friends: friends,
          joinTime: Date.now(),
          level: 1,
        },
        { merge: true }
      );

      const userEnergyRef = doc(db, "energies", `${id}`);
      await setDoc(
        userEnergyRef,
        {
          level: 1,
          energy: energyByLevel[1],
          time: Timestamp.fromDate(new Date()),
        },
        { merge: true }
      );
    }

    console.log("Transaction successfully committed!");
  } catch (e) {
    ctx.reply(JSON.stringify(e));
    console.log("Transaction failed: ", e);
  }

  await handleOnMessage(ctx);
});

bot.on("message", async (ctx) => {
  await handleOnMessage(ctx);
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Retrieve the POST request body that gets sent from Telegram
    const { body, query } = req;

    if (query.setWebhook === "true") {
      const webhookUrl = `https://game.temecoin.xyz/api/telegram-hook?secret_hash=${SECRET_HASH}`;

      // Would be nice to somehow do this in a build file or something
      const isSet = await bot.telegram.setWebhook(webhookUrl);
      console.log(`Set webhook to ${webhookUrl}: ${isSet}`);
    }

    if (query.secret_hash === SECRET_HASH) {
      await bot.handleUpdate(body);
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error);
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  res.status(200).send("OK");
}
