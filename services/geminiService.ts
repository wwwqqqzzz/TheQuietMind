
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Helpers for Audio ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- API Functions ---

/**
 * Uses gemini-2.5-flash with Google Search Grounding
 */
export const searchLibrary = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a philosophical, slightly melancholic summary or analysis of this topic: ${query}.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "The archives are silent on this matter.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    // Extract URLs if available
    const sources = groundingChunks
      ?.filter((c) => c.web)
      .map((c) => c.web as { uri: string; title: string });

    return { text, sources };
  } catch (error) {
    console.error("Library Search Error:", error);
    throw new Error("The connection to the archives was severed.");
  }
};

/**
 * Uses gemini-3-pro-preview for Image Analysis
 */
export const analyzeImage = async (base64Image: string, mimeType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: "Analyze this image. Describe its composition, its shadows, and the feelings it evokes. Keep the tone quiet, observant, and slightly poetic. Focus on the impermanence of the moment.",
          },
        ],
      },
    });
    return response.text || "The vision is clouded.";
  } catch (error) {
    console.error("Vision Error:", error);
    throw new Error("The inner eye refuses to open.");
  }
};

/**
 * Uses gemini-2.5-flash-preview-tts for Text-to-Speech
 */
export const speakText = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Charon' }, // Charon fits the gothic theme perfectly
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No voice emerged from the void.");

    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputNode = outputAudioContext.createGain();
    outputNode.gain.value = 1.0; // Full volume

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      outputAudioContext,
      24000,
      1,
    );

    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputNode);
    outputNode.connect(outputAudioContext.destination);
    source.start();
    
    return "The voice has spoken.";

  } catch (error) {
    console.error("TTS Error:", error);
    throw new Error("Silence prevails.");
  }
};

/**
 * Uses gemini-3-pro-preview with Thinking Mode for Deep Philosophical Inquiry
 */
export const askPhilosopher = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a digital philosopher residing in a gothic, melancholic archive. 
      Answer the user's query with deep reasoning, focusing on existential themes, impermanence, and beauty. 
      Query: ${query}`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        // maxOutputTokens must NOT be set when using thinkingBudget
      }
    });
    return response.text || "The thought dissolves before taking shape.";
  } catch (error) {
    console.error("Philosopher Error:", error);
    throw new Error("The deep mind is unreachable.");
  }
};

/**
 * Uses gemini-2.5-flash-image for Image Editing
 */
export const editImage = async (base64Image: string, mimeType: string, prompt: string) => {
  try {
    // Extract base64 data if it comes with prefix
    const cleanBase64 = base64Image.split(',')[1] || base64Image;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
           { inlineData: { data: cleanBase64, mimeType: mimeType } },
           { text: prompt }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
         return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image returned");
  } catch (error) {
    console.error("Image Edit Error:", error);
    throw new Error("The transformation failed.");
  }
};
