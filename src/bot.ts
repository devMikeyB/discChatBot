import { Client, GatewayIntentBits } from "discord.js"
import { on } from "express/lib/request";
import config from "./config"
import * as commandModules from "./commands"

const commands = Object(commandModules);

export const client = new Client({ 
    intents: [GatewayIntentBits.Guilds]
});

client.on("ready", () => {
    console.log("Discord bot ready!");
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName} = interaction;
  commands[commandName].execute(interaction, client);
});

client.login(config.DISCORD_TOKEN)