# [grammY](https://grammy.dev) on [Deno Deploy](https://deno.com/deploy)

## Setup

1. Create a project on [Deno Deploy](https://deno.com/deploy)
2. Add `TOKEN` to environment variables (it can be found on project's settings page)
3. Set your bot's webhook url to `https://<PROJECT_NAME>.deno.dev/<TOKEN>` (Replacing `<...>` with respective values). In order to do that, run this url (in your browser, for example): `https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<PROJECT_NAME>.deno.dev/<TOKEN>`

### Deploying with `deployctl`

4. Install [`deployctl`](https://github.com/denoland/deployctl)
5. Create a new [access token](https://dash.deno.com/user/access-tokens). Save it somewhere
6. Run this command `deployctl deploy --project <PROJECT_NAME> ./server.ts --prod --token <ACCESS_TOKEN>`
