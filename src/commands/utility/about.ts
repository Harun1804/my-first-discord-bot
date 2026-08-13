import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../types/command.js';

const about: Command = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Show information about this bot.'),
	async execute(interaction) {
		await interaction.reply({
			content: `Hello from ${interaction.client.user.username}.`,
			ephemeral: true,
		});
	},
};

export default about;