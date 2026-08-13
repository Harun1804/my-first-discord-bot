export async function handleInteraction(interaction) {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	const command = interaction.client.commands.get(interaction.commandName);
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