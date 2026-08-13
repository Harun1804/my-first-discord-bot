import { AttachmentBuilder, type Guild } from "discord.js";
import type { ResolvedVideo } from "@/utils/cobalt.js";

const SUPPORTED_VIDEO_URL_PATTERN = /https?:\/\/(www\.)?(instagram\.com|instagr\.am|youtube\.com|youtu\.be|facebook\.com|fb\.watch|tiktok\.com|vm\.tiktok\.com|twitter\.com|x\.com)\/\S+/gi;

// Discord's default upload cap; boosted servers get higher limits based on premium tier.
const DEFAULT_MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const BOOST_TIER_MAX_UPLOAD_BYTES: Record<number, number> = {
  2: 50 * 1024 * 1024,
  3: 100 * 1024 * 1024,
};

export function extractSupportedVideoUrls(content: string): string[] {
  const matches = content.match(SUPPORTED_VIDEO_URL_PATTERN);
  return matches ? Array.from(new Set(matches)) : [];
}

export function getMaxUploadBytes(guild: Guild | null): number {
  if (!guild) {
    return DEFAULT_MAX_UPLOAD_BYTES;
  }
  return BOOST_TIER_MAX_UPLOAD_BYTES[guild.premiumTier] ?? DEFAULT_MAX_UPLOAD_BYTES;
}

/** Downloads the resolved video and returns an attachment, or null if it exceeds the guild's upload limit. */
export async function buildVideoAttachment(resolved: ResolvedVideo, guild: Guild | null): Promise<AttachmentBuilder | null> {
  const maxBytes = getMaxUploadBytes(guild);

  const headResponse = await fetch(resolved.url, { method: "HEAD" }).catch(() => null);
  const contentLength = headResponse?.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxBytes) {
    return null;
  }

  const response = await fetch(resolved.url);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > maxBytes) {
    return null;
  }

  return new AttachmentBuilder(buffer, { name: resolved.filename });
}
