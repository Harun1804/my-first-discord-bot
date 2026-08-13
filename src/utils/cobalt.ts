import { config } from "@/config/config.js";

interface CobaltTunnelResponse {
  status: "tunnel" | "redirect";
  url: string;
  filename: string;
}

interface CobaltPickerItem {
  type: "photo" | "video" | "gif";
  url: string;
  thumb?: string;
}

interface CobaltPickerResponse {
  status: "picker";
  picker: CobaltPickerItem[];
}

interface CobaltLocalProcessingResponse {
  status: "local-processing";
  tunnel: string[];
  output: { filename: string };
}

interface CobaltErrorResponse {
  status: "error";
  error: { code: string };
}

type CobaltResponse = CobaltTunnelResponse | CobaltPickerResponse | CobaltLocalProcessingResponse | CobaltErrorResponse;

export interface ResolvedVideo {
  url: string;
  filename: string;
}

export class CobaltError extends Error {}

export async function resolveVideoUrl(sourceUrl: string): Promise<ResolvedVideo> {
  if (!config.cobaltApiUrl) {
    throw new CobaltError("Video downloading isn't configured. Set COBALT_API_URL in your .env file.");
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (config.cobaltApiKey) {
    headers.Authorization = `Api-Key ${config.cobaltApiKey}`;
  }

  const response = await fetch(config.cobaltApiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ url: sourceUrl, videoQuality: "1080", downloadMode: "auto" }),
  });

  const data = (await response.json()) as CobaltResponse;

  if (data.status === "error") {
    throw new CobaltError(data.error.code);
  }

  if (data.status === "picker") {
    const media = data.picker.find((item) => item.type === "video") ?? data.picker[0];
    if (!media) {
      throw new CobaltError("api.error.no_media_found");
    }
    return { url: media.url, filename: `video-${Date.now()}.mp4` };
  }

  if (data.status === "local-processing") {
    const tunnelUrl = data.tunnel[0];
    if (!tunnelUrl) {
      throw new CobaltError("api.error.local_processing_unsupported");
    }
    return { url: tunnelUrl, filename: data.output.filename };
  }

  return { url: data.url, filename: data.filename };
}
