import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { commandData } from './commands/index.js';
import { config } from './config/config.js';

const rest = new REST().setToken(config.token);
const clientId = config.clientId;
const route = config.guildId ? Routes.applicationGuildCommands(clientId, config.guildId) : Routes.applicationCommands(clientId);

await rest.put(route, { body: commandData });
console.log(`Registered ${commandData.length} application command(s)${config.guildId ? ' in the test server' : ' globally'}.`);
