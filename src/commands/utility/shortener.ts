import { SlashCommandBuilder } from "discord.js";
import type { Command } from "@/types/command.js";
import { validateUrl } from "@/utils/validate.js";
import { generateNewUrl } from "@/utils/generate.js";

const shortener: Command = {
  data: new SlashCommandBuilder()
    .setName("shortener")
    .setDescription("Shorten a URL")
    .addStringOption((option) => option.setName("url").setDescription("The URL to shorten").setRequired(true)) as SlashCommandBuilder,
  async execute(interaction) {
    // Validate the URL
    const fullUrl = interaction.options.getString("url", true);

    if (!validateUrl(fullUrl)) {
      await interaction.reply("Invalid URL provided!");
      return;
    }

    const shortenedUrl = generateNewUrl(fullUrl);

    await interaction.reply(`Shortened URL: ${shortenedUrl}`);
  },
};

export default shortener;
