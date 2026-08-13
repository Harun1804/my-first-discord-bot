if (!process.env.DISCORD_TOKEN) {
	throw new Error('Missing required environment variable: DISCORD_TOKEN');
}

export const config = Object.freeze({
	token: process.env.DISCORD_TOKEN,
	clientId: process.env.DISCORD_CLIENT_ID,
	clientSecret: process.env.DISCORD_CLIENT_SECRET,
	guildId: process.env.DISCORD_GUILD_ID,
});

export function requireConfig(variableName) {
	if (!process.env[variableName]) {
		throw new Error(`Missing required environment variable: ${variableName}`);
	}

	return process.env[variableName];
}
