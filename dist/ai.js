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
        const prompt = `Given a medical term, return the term along with its definition, etymology, its function or role in the body, common causes, symptoms, and treatments. If the term refers to an infection, include information about the pathogen, how it spreads, and potential treatments.

    Provide the output in the following format:

    Term: <medical_term>
    
    Etymology: <etymology>

    Definition: <definition>

    Function: <function/role in the body>

    Causes: <common causes or risk factors>
    
    Symptoms: <key symptoms>

    Treatment: <treatment options>

    If the term refers to an infection:

    Pathogen: <name of pathogen (e.g., bacterium, virus)>

    Transmission: <how it spreads>

    Treatment: <treatment options, including antibiotics or antivirals>

    Example:
    

    Term: Pneumonia
    
    Etymology: Derived from the Greek word "pneumon," meaning lung.

    Definition: Pneumonia is an infection of the lungs, causing inflammation in the alveoli (air sacs) which can lead to difficulty breathing.

    Function: The lungs help oxygenate blood by transferring oxygen from inhaled air into the bloodstream. Pneumonia interferes with this vital function by inflaming the alveoli.

    Causes: Pneumonia can be caused by bacteria, viruses, or fungi. Common bacterial causes include *Streptococcus pneumoniae* and *Haemophilus influenzae*.

    Symptoms: Symptoms include coughing, chest pain, fever, chills, and shortness of breath.

    Treatment: Antibiotics are prescribed for bacterial pneumonia, while antiviral medications may be used for viral types. Severe cases may require hospitalization.

    If it's an infection:

    Pathogen: *Streptococcus pneumoniae* (bacteria)

    Transmission: Pneumonia spreads through respiratory droplets when an infected person coughs or sneezes.

    Treatment: Antibiotics like penicillin or amoxicillin are commonly used to treat bacterial pneumonia.

    Example:

    Term: Diabetes

    Etymology: Derived from the Greek word "siphon," referring to the excessive urination associated with the disease.

    Definition: Diabetes is a chronic condition where the body has trouble regulating blood sugar (glucose) levels, either due to insufficient insulin production or resistance to insulin.

    Function: Insulin helps regulate blood sugar levels by allowing glucose to enter cells for energy. In diabetes, this process is disrupted.

    Causes: Risk factors for diabetes include genetics, obesity, sedentary lifestyle, and poor diet.

    Symptoms: Symptoms include increased thirst, frequent urination, fatigue, and blurred vision.

    Treatment: Type 1 diabetes requires insulin injections. Type 2 diabetes is often managed with lifestyle changes, oral medications, and sometimes insulin.

    Example:

    Term: Tuberculosis

    Etymology: From the Latin word "tuberculum," meaning "small swelling," referring to the lumps that can form in the lungs.

    Definition: Tuberculosis (TB) is an infectious disease primarily affecting the lungs but can also spread to other parts of the body.

    Function: TB damages lung tissue and interferes with the body's ability to absorb oxygen properly.

    Causes: TB is caused by *Mycobacterium tuberculosis*, a slow-growing bacterium that primarily infects the lungs.

    Symptoms: Chronic cough, chest pain, night sweats, weight loss, and coughing up blood.

    Treatment: TB is treated with a long course of antibiotics, often including isoniazid, rifampin, and pyrazinamide.

    If it's an infection:

    Pathogen: *Mycobacterium tuberculosis* (bacteria)

    Transmission: TB spreads through the air when an infected person coughs, sneezes, or talks.

    Treatment: A combination of antibiotics, often taken for 6-9 months.

    Example:

    Term: ${content}

    Etymology: 

    Definition: 

    Function: 

    Causes: 

    Symptoms: 

    Treatment: 

    If it's an infection:

    Pathogen: 

    Transmission: 

    Treatment:`;
        const result = yield model.generateContent(prompt);
        console.log(result.response.candidates[0].safetyRatings);
        return result.response.text();
    });
}
exports.default = genAIResponse;
