import about from './utility/about.js';
import ping from './utility/ping.js';
import type { Command } from '../types/command.js';

const commandModules: Command[] = [about, ping];

export const commands = new Map(commandModules.map((command) => [command.data.name, command]));
export const commandData = commandModules.map((command) => command.data.toJSON());