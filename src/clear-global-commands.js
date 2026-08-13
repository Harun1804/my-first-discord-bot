import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { config } from './config/config.js';

const rest = new REST().setToken(config.token);
const clientId = config.clientId;
const guildId = config.guildId;
const route = guildId ? Routes.applicationGuildCommands(clientId, guildId) : Routes.applicationCommands(clientId);

await rest.put(route, { body: [] });
console.log('Cleared all global application commands.');
