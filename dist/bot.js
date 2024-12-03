"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const config_1 = require("./config");
const prof_1 = __importDefault(require("./prof"));
const generative_ai_1 = require("@google/generative-ai");
const bot = new node_telegram_bot_api_1.default(config_1.config.bot_token, { polling: true });
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, config_1.welcome, { parse_mode: "Markdown" });
});
bot.onText(/\/help|\/about/, (msg) => {
    const chatId = msg.chat.id;
    const helpText = config_1.about;
    bot.sendMessage(chatId, helpText, { parse_mode: "Markdown" });
});
bot.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const userInput = msg.text;
    if (userInput === null || userInput === void 0 ? void 0 : userInput.startsWith("/")) {
        return;
    }
    if (userInput) {
        const sentMessage = yield bot.sendMessage(chatId, "Bot is generating a response", { parse_mode: "Markdown" });
        try {
            yield bot.sendChatAction(chatId, "typing");
            let response = yield (0, prof_1.default)(userInput);
            yield bot.editMessageText(response, { chat_id: chatId, message_id: sentMessage.message_id, parse_mode: "Markdown" });
        }
        catch (error) {
            if (error instanceof generative_ai_1.GoogleGenerativeAIResponseError) {
                const response = "Content is unsafe";
                yield bot.sendMessage(chatId, response);
            }
            // console.log("Error", error)
        }
    }
}));
