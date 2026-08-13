import { MessageFlags, type Interaction } from "discord.js";
import { commands } from "@/commands/index.js";

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
  } catch (error) {
    console.error(`Failed to run /${interaction.commandName}:`, error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "That command failed. Please try again later.", flags: MessageFlags.Ephemeral });
    } else {
      await interaction.reply({ content: "That command failed. Please try again later.", flags: MessageFlags.Ephemeral });
    }
  }
}
