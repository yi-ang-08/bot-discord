import { REST, Routes } from "discord.js";
import dotenv  from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },

  {
    name: "lmao",
    description: "Replies with lmao!",
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  console.log("interaction", interaction);
  const { user } = interaction;
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("@here");
  }

  if (interaction.commandName === "lmao") {
    await interaction.reply(`${user.username || "lmao"}`);
  }
});

client.login(TOKEN);
