import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import { config } from './config/config.js';
import { commands } from './commands/index.js';
import { handleInteraction } from './handlers/interactionCreate.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = commands;

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready as ${readyClient.user.tag}.`);
});

client.on(Events.InteractionCreate, handleInteraction);

client.login(config.token);
