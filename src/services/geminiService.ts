import { GoogleGenAI, Type } from "@google/genai";
import { DIAMONDS } from "../constants";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please set it in your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function getStyleRecommendations(prompt: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a luxury jewelry stylist for Nimai Diamonds. 
      The user is looking for advice on jewelry. 
      User request: ${prompt}
      
      Provide a sophisticated, concise recommendation that highlights ethical diamonds, 
      bespoke craftsmanship, and specific diamond cuts (Cushion, Pear, Radiant). 
      Keep the tone elegant and professional.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our stylists are currently attending to other clients. Please try again shortly for your personalized recommendation.";
  }
}

export async function findSimilarDiamonds(base64Image: string, mimeType: string): Promise<string[]> {
  try {
    const ai = getAI();
    const diamondData = DIAMONDS.map(d => ({
      id: d.id,
      name: d.name,
      description: d.description,
      carat: d.carat,
      cut: d.cut,
      color: d.color,
      clarity: d.clarity
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType
          }
        },
        {
          text: `Analyze this diamond jewelry image and identify its key characteristics (cut, setting, style). 
          Then, look at the following list of available diamonds and return the IDs of the top 3 most similar designs.
          Available Diamonds: ${JSON.stringify(diamondData)}
          
          Return ONLY a JSON array of strings representing the diamond IDs. No other text.`
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text || "[]";
    const result = JSON.parse(text);
    return result;
  } catch (error) {
    console.error("Visual Search Error:", error);
    return [];
  }
}
