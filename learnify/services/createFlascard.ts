// services/flashcardService.ts
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export interface Flashcard {
  subject: string;
  topic: string;
  explanation: string;
  image?: string; // optional
  file?: string;  // optional
  createdAt?: any;
}

export const saveFlashcard = async (flashcard: Flashcard) => {
  try {
    const docRef = await addDoc(collection(db, "flashcards"), {
      ...flashcard,
      createdAt: Timestamp.now(),
    });
    console.log("Flashcard saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding flashcard: ", e);
    throw e;
  }
};
