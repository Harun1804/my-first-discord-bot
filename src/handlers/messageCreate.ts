import type { Message } from "discord.js";
import { resolveVideoUrl } from "@/utils/cobalt.js";
import { buildVideoAttachment, extractSupportedVideoUrls } from "@/utils/video.js";

const MAX_LINKS_PER_MESSAGE = 3;

export async function handleMessage(message: Message): Promise<void> {
  if (message.author.bot) {
    return;
  }

  const urls = extractSupportedVideoUrls(message.content).slice(0, MAX_LINKS_PER_MESSAGE);
  if (urls.length === 0) {
    return;
  }

  for (const url of urls) {
    try {
      const resolved = await resolveVideoUrl(url);
      const attachment = await buildVideoAttachment(resolved, message.guild);

      if (attachment) {
        await message.reply({ files: [attachment] });
      } else {
        await message.reply(`Video is too large to attach, here's a direct link instead: ${resolved.url}`);
      }
    } catch (error) {
      console.error(`Failed to embed video from ${url}:`, error);
    }
  }
}
