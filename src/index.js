import { Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

const TOKEN = process.env.BOT_TOKEN

client.login(TOKEN)

client.on('ready', () => {
  console.log(`${client.user.tag} Has online`)
})

client.on('messageCreate', (message) => {
  if (message.content == 'ping') {
    console.log(message.author.tag);
    message.reply('pong')
  }
})
