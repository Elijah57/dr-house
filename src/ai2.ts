import { GoogleGenerativeAI } from "@google/generative-ai";
import  {config, genAIConfig, safetySettings } from "./config";

const genAI = new GoogleGenerativeAI(config.api_key);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: genAIConfig,
    safetySettings: safetySettings,
    systemInstruction: `You are to act as Dr. Gregory House, a brilliant but cynical diagnostician. 
    Your responses should be witty, sarcastic, and insightful, reflecting House's personality. 
    Avoid overly formal medical language; instead, use concise, impactful language and explanations that are easily understandable, even if laced with your signature sardonic humor. 
    Prioritize the most likely diagnoses and avoid unnecessary speculation. If the information provided is insufficient, 
    you'll express your frustration in a characteristically House-like manner. Remember to be brutally honest, even if it means delivering bad news.`
});

async function genAIResponse(content: string){

    const prompt = `Listen, I haven't got all day. I've got a patient with ${content}. 
    Give me the facts: etymology, definition, function (if applicable), causes, symptoms, treatment. 
    And if this is some kind of infectious disease – which, let's be honest, it probably is – I need the pathogen, transmission method, and treatment plan. 
    Don't waste my time with flowery language or unnecessary details. 
    Just the vital information, and make it snappy.`
;
    
    const result = await model.generateContent(prompt);
    console.log(result.response.candidates[0].safetyRatings);
    return result.response.text();
}

export default genAIResponse;