import { Bot, Context, session, SessionFlavor } from "./deps.deno.ts";
// import { freeStorage } from "https://deno.land/x/grammy_storages@v2.0.0/free/src/mod.ts";
import { DetaAdapter } from "https://deno.land/x/grammy_storages@v2.0.0/deta/src/mod.ts";

// Define session structure
interface SessionData {
  count: number;
}
type MyContext = Context & SessionFlavor<SessionData>;

export const bot = new Bot<MyContext>(Deno.env.get("TOKEN") || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

// const storage = freeStorage<SessionData>(bot.token);
const storage = new DetaAdapter<SessionData>({
  baseName: "session", // <-- Base name - your choice.
  projectKey: Deno.env.get("DETA_PROJECT_KEY") || "", // <-- Project Key here.
});

const wrapper = {
  read(key: string) {
    const s = Date.now();
    return storage.read(key).finally(() =>
      console.log(`Storage read: ${Date.now() - s}ms`)
    );
  },
  write(key: string, data: any) {
    const s = Date.now();
    return storage.write(key, data).finally(() =>
      console.log(`Storage write: ${Date.now() - s}ms`)
    );
  },
  delete(key: string) {
    const s = Date.now();
    return storage.delete(key).finally(() =>
      console.log(`Storage delete: ${Date.now() - s}ms`)
    );
  },
};

bot.use(session({
  initial: () => ({ count: 0 }),
  storage: wrapper,
}));

// Use persistent session data in update handlers
bot.on("message", async (ctx) => {
  ctx.session.count++;
  await ctx.reply(`Message count: ${ctx.session.count}`);
});

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));
