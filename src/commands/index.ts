import ping from './utility/ping.js';
import shortener from './utility/shortener.js';
import help from './utility/help.js';
import type { Command } from '@/types/command.js';

const commandModules: Command[] = [ping, shortener, help];

export const commands = new Map(commandModules.map((command) => [command.data.name, command]));
export const commandData = commandModules.map((command) => command.data.toJSON());