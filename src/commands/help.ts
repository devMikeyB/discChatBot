import { Client, ChatInputCommandInteraction, GuildChannel, BaseGuildTextChannel, TextChannel} from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { type } from "express/lib/response";
//import { options } from "express/lib/application";
//const { SlashCommandBuilder} = require('discord.js')

export const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Creates a help message.")
    .addStringOption((option) => 
        option
            .setName("description")
            .setDescription("Describe your problem.")
            .setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction, client: Client) {
    if (!interaction.channelId) return;
    const channel = await client.channels.fetch(interaction.channelId)
    if (!channel) return;
    const thread = await (channel as TextChannel).threads.create({
        name: 'support-${Date.now()}',
        reason: 'Support ticket ${Date.now()}'
    })

    const problemDescription = interaction.options.getString("description")!
}