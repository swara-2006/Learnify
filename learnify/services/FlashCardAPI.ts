import axios from "axios";

export interface GeneratedFlashcard {
  question: string;
  answer: string;
}

const GEMINI_API_KEY = "AIzaSyCU4Dmnom0giPxWc26yANBYvIGOzgIoqMA"; // <-- PUT YOUR API KEY
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

// Primary + fallback models
const PRIMARY_MODEL = "gemini-2.0-flash";
const FALLBACK_MODEL = "gemini-1.5-flash";

async function requestFlashcards(model: string, content: string, numberOfCards: number) {
  const response = await axios.post(
    ENDPOINT,
    {
      model,
      messages: [
        {
          role: "user",
          content: `Generate ${numberOfCards} flashcards in the following format:

Q: question
A: answer

Content:
${content}
          `,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GEMINI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content;
}

export const generateFlashcards = async (content: string, numberOfCards: number) => {
  try {
    let outputText: string;

    // 🔥 1. First attempt using the main model
    try {
      outputText = await requestFlashcards(PRIMARY_MODEL, content, numberOfCards);
    } catch (err: any) {
      console.log("Primary model failed:", err.response?.status, err.response?.data);

      // 🔥 2. If rate-limited (429) → auto fallback
      if (err.response?.status === 429) {
        console.log("Retrying with fallback model:", FALLBACK_MODEL);
        outputText = await requestFlashcards(FALLBACK_MODEL, content, numberOfCards);
      } else {
        throw err; // Not a rate limit → rethrow
      }
    }

    // 🔍 Parse Q/A format
    const flashcards: GeneratedFlashcard[] = [];
    const blocks = outputText.split(/Q:/).slice(1);

    blocks.forEach((block: string) => {
      const [question, answerPart] = block.split("A:");
      if (!question || !answerPart) return;

      flashcards.push({
        question: question.trim(),
        answer: answerPart.trim(),
      });
    });

    return flashcards;
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw error;
  }
};
