import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../types/command.js';

const ping: Command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check whether the bot is responding.'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};

export default ping;