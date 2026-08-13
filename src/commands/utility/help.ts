import { SlashCommandBuilder } from "discord.js";
import type { Command } from "@/types/command.js";

const help: Command = {
  data: new SlashCommandBuilder().setName("help").setDescription("Get a list of all available commands."),
  async execute(interaction) {
    const client = interaction.client as typeof interaction.client & { commands: Map<string, Command> };
    const commands = Array.from(client.commands.values(), (command) => `\`${command.data.name}\`: ${command.data.description}`).join("\n");
    await interaction.reply(`Here are all the available commands:\n\n${commands}`);
  },
};

export default help;
