import { Bot } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

export const bot = new Bot(Deno.env.get('TOKEN') || ''); 

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command('ping', (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`))

await bot.init()
