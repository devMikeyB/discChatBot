import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Configuration, OpenAIApi } from "openai";

export const data = new SlashCommandBuilder()
    .setName("inquire")
    .setDescription("Ask anything you want!")
    .addStringOption((option) => 
        option
            .setName("question")
            .setDescription("Your question, please :)")
            .setRequired(true));

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_SECRET
});


const openai = new OpenAIApi(configuration);

const completion = async () => {
     await openai.createCompletion({
        model: "text-davinci-002",
        prompt: data.description
    });
    
} 


export async function execute(interaction: ChatInputCommandInteraction) {
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
}