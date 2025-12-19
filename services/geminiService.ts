
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getSurvivalAdvice = async (day: number, warriorName: string) => {
  if (!API_KEY) return "The transmissions are garbled. Stay hydrated, Survivor.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a survival guide in a post-apocalyptic world called the Fastlandz. 
      The survivor's name is ${warriorName}. They are on Day ${day} of their 7-day metabolic survival journey.
      Provide a short (2-sentence) tactical briefing to motivate them. Use grit but be encouraging.
      Focus on their metabolic health as their 'engine' and fasting as 'fuel regulation'.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keep your engine running clean. The oasis is closer than you think.";
  }
};
