import about from './utility/about.js';
import ping from './utility/ping.js';

const commandModules = [about, ping];

export const commands = new Map(commandModules.map((command) => [command.data.name, command]));
export const commandData = commandModules.map((command) => command.data.toJSON());