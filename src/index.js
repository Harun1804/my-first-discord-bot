import { Client, GatewayIntentBits, Routes } from 'discord.js'
import dotenv from 'dotenv'
import { REST } from '@discordjs/rest'

dotenv.config()

const TOKEN = process.env.BOT_TOKEN
const CLIENT_ID = process.env.BOT_CLIENT_ID
const GUILD_ID = process.env.BOT_GUILD_ID

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

const rest = new REST({ version: '10' }).setToken(TOKEN)


client.on('ready', () => console.log(`${client.user.tag} Has online`))

async function main() {
  const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
    {
      name: 'server',
      description: 'Replies with server info!',
    }
  ]

  try {
    console.log('Started refreshing application (/) commands.')
    
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    )
    
    console.log('Successfully reloaded application (/) commands.')
    client.login(TOKEN)
  } catch (error) {
    console.error(error)
  }
}

main()
