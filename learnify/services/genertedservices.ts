import { db } from "../firebaseConfig"; // your firebase config
import { collection, addDoc, Timestamp } from "firebase/firestore";

export interface Flashcard {
  subject: string;
  topic: string;
  explanation: string;
  createdAt?: any;
}

export const saveGeneratedFlashcard = async (flashcard: Flashcard) => {
  try {
    await addDoc(collection(db, "generatedFlashcards"), {
      ...flashcard,
      createdAt: Timestamp.now(),
    });
  } catch (e) {
    console.error("Error saving flashcard:", e);
    throw e;
  }
};
