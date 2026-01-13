import { GoogleGenAI, Type } from "@google/genai";

// Initialize AI client (Assuming API_KEY is available in env)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'mock-key' });

export const generateCourseDetails = async (topic: string): Promise<{ description: string; objectives: string[]; syllabus: string } | null> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found. Returning mock AI response.");
    return {
      description: `[IA Simulada] Descrição gerada para: ${topic}. Este curso aborda os fundamentos e práticas avançadas de forma didática.`,
      objectives: [`Compreender ${topic}`, "Aplicar conceitos práticos", "Avaliar resultados"],
      syllabus: `<p><strong>Módulo 1:</strong> Introdução ao ${topic}</p><p><strong>Módulo 2:</strong> Desenvolvimento Prático</p><p><strong>Módulo 3:</strong> Projeto Final</p>`
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-latest", // Using flash for speed/cost effectiveness for text
      contents: `Cria uma estrutura de curso profissional sobre "${topic}" para adultos. 
      Linguagem: Português de Portugal (PT-PT).
      Retorna APENAS JSON.
      Estrutura necessária:
      {
        "description": "Uma descrição atrativa de 2 parágrafos",
        "objectives": ["Objetivo 1", "Objetivo 2", "Objetivo 3", "Objetivo 4"],
        "syllabus": "String HTML com lista de 4 módulos e breves tópicos"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            objectives: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            syllabus: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const generateClassroomTip = async (): Promise<string> => {
    if (!process.env.API_KEY) return "Dica Prática: Utilize atalhos de teclado para poupar tempo no dia-a-dia.";

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-latest",
            contents: "Gera uma 'Dica Prática para a Sala de Aula' curta (max 2 frases) sobre tecnologia educativa. Em PT-PT.",
        });
        return response.text || "Dica não disponível.";
    } catch (e) {
        return "Dica Prática: Mantenha sempre cópias de segurança dos seus ficheiros.";
    }
}
