import { NextApiRequest, NextApiResponse } from "next";
import { Telegraf, Context } from "telegraf";

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
    const { message } = ctx;
  
    const isGroup =
      message?.chat.type === "group" || message?.chat.type === "supergroup";
  
    if (isGroup) {
      await ctx.reply("This bot is only available in private chats.");
      return;
    }
  
    const telegramUsername = message?.from?.username;
    const reply = "a message was sent";
  
    await ctx.reply(reply);
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