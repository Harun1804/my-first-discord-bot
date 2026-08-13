import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { config } from "./config/config.js";
import { commands } from "./commands/index.js";
import { handleInteraction } from "./handlers/interactionCreate.js";
import { handleMessage } from "./handlers/messageCreate.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
(client as typeof client & { commands: typeof commands }).commands = commands;

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready as ${readyClient.user.tag}.`);
});

client.on(Events.InteractionCreate, handleInteraction);
client.on(Events.MessageCreate, handleMessage);

client.login(config.token);
