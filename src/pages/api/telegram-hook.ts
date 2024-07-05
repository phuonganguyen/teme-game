import db from "@/libs/firestore";
import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { Telegraf, Context, Markup } from "telegraf";

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
  if (args.length > 0) {
    const refId = args[0];
    const { id, is_premium, username } = message.from;
    try {
      const userDocRef = doc(db, "users", `${id}`);
      const userDoc = await getDoc(userDocRef);
      const isValidRef = refId !== id.toString();
      if (!userDoc.exists()) {
        let coins = 0;
        if(isValidRef){
          coins = is_premium ? 10000 : 2500;
        }

        await setDoc(
          userDocRef,
          { username: username, coins: coins },
          { merge: true }
        );
      }

      if (isValidRef) {
        const refDocRef = doc(db, "users", refId);
        const refDoc = await getDoc(refDocRef);
        if (refDoc.exists()) {
          const newCoins = refDoc.data().coins + (is_premium ? 25000 : 5000);
          await updateDoc(refDocRef, { coins: newCoins });
        }
      }

      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
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
