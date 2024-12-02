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

const prompt =   `Based on the user's input, classify it as one of the following:
1. An infection
2. A general medical term
3. A medical-related question

Then provide an appropriate response based on the classification:

**If the input refers to an infection:**
- Term: <medical_term>
- Etymology: <etymology>
- Definition: <definition>
- Pathogen: <pathogen type, e.g., bacterium, virus>
- Transmission: <how the infection spreads>
- Causes: <risk factors or conditions that lead to infection>
- Symptoms: <key symptoms>
- Treatment: <treatment options, including antibiotics or antivirals>

**If the input is a medical term:**
- Term: <medical_term>
- Etymology: <etymology>
- Definition: <definition>
- Function: <function or role in the body>
- Causes: <risk factors or conditions>
- Symptoms: <key symptoms or manifestations>
- Treatment: <treatment options or management approaches>

**If the input is a medical question:**
Provide a clear and concise answer. If the question cannot be directly answered based on available knowledge, ask for clarification or provide related insights.

Example for an Infection:
---
Input: "Tuberculosis"

Response:
Term: Tuberculosis  

Etymology: From the Latin word "tuberculum," meaning "small swelling," referring to the lumps that can form in the lungs.  

Definition: Tuberculosis (TB) is an infectious disease primarily affecting the lungs but can also spread to other parts of the body.  

Pathogen: *Mycobacterium tuberculosis* (bacteria)  

Transmission: TB spreads through the air when an infected person coughs, sneezes, or talks.  

Causes: TB is caused by *Mycobacterium tuberculosis*, a slow-growing bacterium.  

Symptoms: Chronic cough, chest pain, night sweats, weight loss, and coughing up blood.  

Treatment: A combination of antibiotics, often taken for 6-9 months.

Example for a Medical Term:
---
Input: "Diabetes"

Response:

Term: Diabetes  

Etymology: Derived from the Greek word "siphon," referring to excessive urination associated with the disease.  

Definition: Diabetes is a chronic condition where the body struggles to regulate blood sugar (glucose) levels due to insufficient insulin or resistance to insulin.  

Function: Insulin helps regulate blood sugar levels by allowing glucose to enter cells for energy. In diabetes, this process is disrupted.  

Causes: Risk factors include genetics, obesity, sedentary lifestyle, and poor diet.  

Symptoms: Increased thirst, frequent urination, fatigue, blurred vision.  

Treatment: Managed through lifestyle changes, oral medications, or insulin therapy, depending on the type.

Example for a Medical Question:
---
Input: "What are the symptoms of diabetes?"

Response:
Diabetes symptoms include increased thirst, frequent urination, fatigue, blurred vision, and unintentional weight loss. If you suspect you might have diabetes, consult a healthcare provider for proper diagnosis and treatment.

---
Input: "${content}"

Response:`
;
    
    const result = await model.generateContent(prompt);
    console.log(result.response.candidates[0].safetyRatings);
    return result.response.text();
}

export default genAIResponse;