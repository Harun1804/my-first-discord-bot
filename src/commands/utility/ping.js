import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check whether the bot is responding.'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};