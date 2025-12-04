import { GoogleGenAI, Schema, Type } from "@google/genai";
import { ResumeData } from "../types";

const parseResumeWithGemini = async (base64Pdf: string): Promise<ResumeData> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Define the expected schema for strict JSON output
  const resumeSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      fullName: { type: Type.STRING, description: "Full name of the candidate" },
      title: { type: Type.STRING, description: "Professional title (e.g., Senior Frontend Engineer)" },
      email: { type: Type.STRING, description: "Email address" },
      phone: { type: Type.STRING, description: "Phone number" },
      location: { type: Type.STRING, description: "City and Country" },
      summary: { type: Type.STRING, description: "Professional summary or objective, about 2-3 sentences" },
      skills: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of technical and soft skills"
      },
      experience: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            company: { type: Type.STRING },
            role: { type: Type.STRING },
            period: { type: Type.STRING, description: "Time period (e.g. 2020 - Present)" },
            description: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of bullet points describing responsibilities"
            }
          }
        }
      },
      education: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            school: { type: Type.STRING },
            degree: { type: Type.STRING },
            year: { type: Type.STRING }
          }
        }
      },
      projects: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            role: { type: Type.STRING },
            description: { type: Type.STRING },
            technologies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            link: { type: Type.STRING }
          }
        }
      },
      socialLinks: {
        type: Type.OBJECT,
        properties: {
          github: { type: Type.STRING },
          linkedin: { type: Type.STRING },
          portfolio: { type: Type.STRING }
        }
      }
    },
    required: ["fullName", "title", "summary", "experience", "skills"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: base64Pdf
            }
          },
          {
            text: "You are an expert HR parser. Please analyze the attached PDF resume and extract the data into a structured JSON format matching the schema provided. Translate the content to Chinese (Simplified) if it is in another language, but keep technical terms (like React, TypeScript, AWS) in English. Ensure the summary is professional and engaging."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
        temperature: 0.1, // Low temperature for factual extraction
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No data returned from Gemini");
    }

    return JSON.parse(text) as ResumeData;
  } catch (error) {
    console.error("Error parsing resume with Gemini:", error);
    throw error;
  }
};

export { parseResumeWithGemini };