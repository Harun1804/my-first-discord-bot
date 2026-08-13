import { SlashCommandBuilder } from "discord.js";
import type { Command } from "@/types/command.js";
import { resolveVideoUrl, CobaltError } from "@/utils/cobalt.js";
import { buildVideoAttachment } from "@/utils/video.js";

const video: Command = {
  data: new SlashCommandBuilder()
    .setName("video")
    .setDescription("Download and embed a video from Instagram, TikTok, YouTube, Facebook, X, and more")
    .addStringOption((option) => option.setName("url").setDescription("Link to the video/reel/short/post").setRequired(true)) as SlashCommandBuilder,
  async execute(interaction) {
    const url = interaction.options.getString("url", true);
    await interaction.deferReply();

    try {
      const resolved = await resolveVideoUrl(url);
      const attachment = await buildVideoAttachment(resolved, interaction.guild);

      if (attachment) {
        await interaction.editReply({ files: [attachment] });
      } else {
        await interaction.editReply(`Video is too large to attach, here's a direct link instead: ${resolved.url}`);
      }
    } catch (error) {
      const message = error instanceof CobaltError ? error.message : "Couldn't fetch a video from that link. Make sure it's a supported, public post.";
      console.error("Failed to resolve video:", error);
      await interaction.editReply(message);
    }
  },
};

export default video;
