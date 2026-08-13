import { SlashCommandBuilder } from 'discord.js';

export default {
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