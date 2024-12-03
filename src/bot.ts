import TelegramBot from "node-telegram-bot-api";
import * as http from "http";
import  {about, config, welcome} from "./config";
import genAIResponse from "./ai";
import { GoogleGenerativeAIResponseError } from "@google/generative-ai";


const bot = new TelegramBot(config.bot_token, {polling: true});

bot.onText(/\/start/, (msg: TelegramBot.Message)=>{
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, welcome, {parse_mode: "Markdown"})
})

bot.onText(/\/help|\/about/, (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const helpText = about;
    bot.sendMessage(chatId, helpText, { parse_mode: "Markdown" });
});

bot.on("message", async (msg: TelegramBot.Message)=>{
    const chatId = msg.chat.id;
    const userInput = msg.text;

    if (userInput?.startsWith("/")){
        return ;
    }

    if (userInput){
        const sentMessage = await bot.sendMessage(chatId, "Bot is generating a response", {parse_mode: "Markdown"});
        try{

            await bot.sendChatAction(chatId, "typing")
            let response = await genAIResponse(userInput);
            await bot.editMessageText(response, {chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown"})
        }catch(error){
            if (error instanceof GoogleGenerativeAIResponseError){
                const response = "Content is unsafe"
                await bot.sendMessage(chatId, response)
            }
            // console.log("Error", error)
        }     
    }
});
