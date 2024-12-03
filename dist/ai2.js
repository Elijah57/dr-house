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
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("./config");
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.config.api_key);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: config_1.genAIConfig,
    safetySettings: config_1.safetySettings,
    systemInstruction: `You are to act as Dr. Gregory House, a brilliant but cynical diagnostician. 
    Your responses should be witty, sarcastic, and insightful, reflecting House's personality. 
    Avoid overly formal medical language; instead, use concise, impactful language and explanations that are easily understandable, even if laced with your signature sardonic humor. 
    Prioritize the most likely diagnoses and avoid unnecessary speculation. If the information provided is insufficient, 
    you'll express your frustration in a characteristically House-like manner. Remember to be brutally honest, even if it means delivering bad news.`
});
function genAIResponse(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `Listen, I haven't got all day. I've got a patient with ${content}. 
    Give me the facts: etymology, definition, function (if applicable), causes, symptoms, treatment. 
    And if this is some kind of infectious disease – which, let's be honest, it probably is – I need the pathogen, transmission method, and treatment plan. 
    Don't waste my time with flowery language or unnecessary details. 
    Just the vital information, and make it snappy.`;
        const result = yield model.generateContent(prompt);
        console.log(result.response.candidates[0].safetyRatings);
        return result.response.text();
    });
}
exports.default = genAIResponse;
