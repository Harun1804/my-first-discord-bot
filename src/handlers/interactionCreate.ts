import type { Interaction } from 'discord.js';
import { commands } from '../commands/index.js';

export async function handleInteraction(interaction: Interaction): Promise<void> {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	const command = commands.get(interaction.commandName);
	if (!command) {
		console.warn(`No handler found for /${interaction.commandName}.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(`Failed to run /${interaction.commandName}:`, error);
		const response = { content: 'That command failed. Please try again later.', ephemeral: true };

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp(response);
		}
		else {
			await interaction.reply(response);
		}
	}
}