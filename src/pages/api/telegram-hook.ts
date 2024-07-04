import { NextApiRequest, NextApiResponse } from "next";
import { Telegraf, Context, Markup } from "telegraf";

const SECRET_HASH = "BQmLdGYERo3PY9dn2HQjsgWfV4t04F";
const BOT_TOKEN= "7373895404:AAGeYJytxdito2MjyYJOdVvn7oizQeNQIkE";
const bot = new Telegraf(BOT_TOKEN);

export async function handleTestCommand(ctx: Context) {
    const COMMAND = "/test";
    const { message } = ctx;
  
    let reply = "Hello there! Awaiting your service";
  
    const didReply = await ctx.reply(reply);
  
    if (didReply) {
      console.log(`Reply to ${COMMAND} command sent successfully.`);
    } else {
      console.error(
        `Something went wrong with the ${COMMAND} command. Reply not sent.`
      );
    }
  }
  export async function handleOnMessage(ctx: Context) {
    const reply = "Hello! Welcome to TEMECOIN 🐈\
    The first Player pump player(PPP)  meme AI gaming and Restaking & Rwa Built on @ton_blockchain💎\
    Tap the screen, collect coins, Up a level, Lucky Spin, battle pump up your passive income, and Become the pioneer Set To DOMINATE All Memes!\
    We’ll definitely appreciate your efforts once the token is listed (the dates are coming soon).\
    Don't forget about your friends — bring them to the game and get even more coins together!";
  
    await ctx.reply(reply,
      Markup.inlineKeyboard([
        [Markup.button.url("Subscribe to the channel", "https://t.me/Temecoinxyz")],
        [Markup.button.url("Follow Twitter channel", "https://x.com/Temecoinxyz")],
        [Markup.button.url("Subscribe Youtube channel", "https://youtube.com/@Temecoinxyz ")],
        [Markup.button.webApp("PLAY  NOW", "https://game.temecoin.xyz")]
      ]
     ));
  }
  
  bot.command("test", async (ctx) => {
    await handleTestCommand(ctx)
  });
  
  bot.on("message", async (ctx) => {
    await handleOnMessage(ctx)
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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