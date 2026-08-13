import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { config } from './config/config.js';

const rest = new REST().setToken(config.token);
const clientId = config.clientId;
const routes = config.guildId ? Routes.applicationGuildCommands(clientId, config.guildId) : Routes.applicationCommands(clientId);

await rest.put(routes, { body: [] });
console.log('Cleared all application commands.');