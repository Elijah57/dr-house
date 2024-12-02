import dotenv from "dotenv";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
dotenv.config()

//bot settings
export const about: string = `
Welcome to **WordWizard**! Here's what I can do:

- **Instant Word Matching**: Provide a definition, and I'll return the word that best matches it.
- **User-Friendly**: Simple commands to get you started.
- **Educational Tool**: Improve your vocabulary and learn new words.

Commands:
- /start - Start interacting with the bot
- /help - Show this help message
- /about - Learn more about the bot

Simply type a definition, and I'll find the word!
    `;

export const welcome: string = "Welcome! Please type a medical term or condition, and I’ll provide an explanation";
// app settings
export const config = {
    api_key: process.env.API_KEY?.toString() || "",
    bot_token: process.env.BOT_TOKEN?.toString() || "",
    port: Number(process.env.PORT),
    resucicate: process.env.ME?.toString()|| "http:localhost:3000"
}



// Gen AI Settings
export const genAIConfig = {
    candidateCount: 1,
    maxOutputTokens: 2000,
    temperature: 1.0,
  }


export const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];