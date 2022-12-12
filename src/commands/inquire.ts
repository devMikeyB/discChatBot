import { ChatInputCommandInteraction, SlashCommandBuilder, Client } from 'discord.js';
import { Configuration, OpenAIApi } from "openai";

export const data = new SlashCommandBuilder()
    .setName("inquire")
    .setDescription("Ask anything you want!")
    .addStringOption((option) => 
        option
            .setName("question")
            .setDescription("Your question, please :)")
            .setRequired(true));

const configurationAI = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_SECRET
});


const openai = new OpenAIApi(configurationAI);


/*
const completion = async () => {
     await openai.createCompletion({
        model: "text-davinci-002",
        prompt: data.description
    });
    
} */


export async function execute(interaction: ChatInputCommandInteraction, client: Client) {
    if (!interaction.channelId) return;
    const channel = await client.channels.fetch(interaction.channelId)
    if (!channel) return;
    let responseText:string = "";
    try{
        const getResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: interaction.options.getString('question'),
        max_tokens: 1000
    },
    {
        timeout: 10000,
    })
    if (!getResponse) interaction.reply("Undefined response");
    else responseText += getResponse.data.choices[0].text;
    //responseText += getResponse.data.choices[0].text
    interaction.reply(responseText)  
    console.log(responseText)
    console.log(responseText.length)
    }
    catch( error) {
        interaction.reply(`Error: ${error}`)
    }


}





/*
var text = "";
    (async () => {
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: data.description
        });
        if (gptResponse.data.choices[0].text){
            console.log(gptResponse.data.choices[0].text)
            text = text + gptResponse.data.choices[0].text;
        }
        
    })
*/