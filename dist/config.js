"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.safetySettings = exports.genAIConfig = exports.config = exports.welcome = exports.about = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
//bot settings
exports.about = `
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
exports.welcome = "Welcome! Please type a medical term or condition, and I’ll provide an explanation";
// app settings
exports.config = {
    api_key: ((_a = process.env.API_KEY) === null || _a === void 0 ? void 0 : _a.toString()) || "",
    bot_token: ((_b = process.env.BOT_TOKEN) === null || _b === void 0 ? void 0 : _b.toString()) || "",
    port: Number(process.env.PORT),
    resucicate: ((_c = process.env.ME) === null || _c === void 0 ? void 0 : _c.toString()) || "http:localhost:3000"
};
// Gen AI Settings
exports.genAIConfig = {
    candidateCount: 1,
    maxOutputTokens: 2000,
    temperature: 1.0,
};
exports.safetySettings = [
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
    },
];
