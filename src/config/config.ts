export function requireConfig(variableName: string): string {
  const value = process.env[variableName];
  if (!value) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }

  return value;
}

export const config = Object.freeze({
  token: requireConfig("DISCORD_TOKEN"),
  clientId: requireConfig("DISCORD_CLIENT_ID"),
  clientSecret: requireConfig("DISCORD_CLIENT_SECRET"),
  guildId: requireConfig("DISCORD_GUILD_ID"),
  cobaltApiUrl: requireConfig("COBALT_API_URL"),
  cobaltApiKey: requireConfig("COBALT_API_KEY"),
});
