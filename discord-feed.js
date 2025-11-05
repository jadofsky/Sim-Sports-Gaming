import express from "express";
import { Client, GatewayIntentBits } from "discord.js";

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN; // set in your host environment
const CHANNEL_ID = "1004603096078487642"; // your highlights channel

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

let messagesCache = [];

client.on("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID);
  const fetched = await channel.messages.fetch({ limit: 10 });
  messagesCache = fetched.map(msg => ({
    author: msg.author.username,
    content: msg.content,
    timestamp: msg.createdAt
  }));

  console.log(`Cached ${messagesCache.length} messages.`);
});

client.on("messageCreate", msg => {
  if (msg.channel.id === CHANNEL_ID) {
    messagesCache.unshift({
      author: msg.author.username,
      content: msg.content,
      timestamp: msg.createdAt
    });
    messagesCache = messagesCache.slice(0, 20); // keep most recent 20
  }
});

app.get("/api/highlights", (req, res) => {
  res.json(messagesCache);
});

app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));

client.login(DISCORD_TOKEN);
