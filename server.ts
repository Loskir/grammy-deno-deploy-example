import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.5.0/mod.ts";
import { bot } from './bot.ts'

serve({
  ['/' + Deno.env.get('TOKEN')]: async (request) => {
    const { error } = await validateRequest(request, {
      POST: {
        body: [],
      }
    })
    if (error) {
      return json({ error: error.message }, { status: error.status });
    }
    const body = await request.json()
    try {
      await bot.handleUpdate(body)
    } catch (error) {
      return json({ error: error.toString() }, { status: 500 })
    }
    return json({ ok: true })
  },
  '/': () => {
    return json({hello: 'world'})
  }
});