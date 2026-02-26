import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getStyleRecommendations(prompt: string) {
  try {
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
