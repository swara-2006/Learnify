// src/services/profileService.ts

import { doc, getDoc, setDoc } from "firebase/firestore";
import {db,auth} from "../firebaseConfig";

export interface UserProfile {
  username: string;
  about: string;
  studyGoal: string;
  favoriteSubject: string;
  avatar: string;
}

// ============================
// SAVE USER PROFILE
// ============================
export async function saveProfile(data: UserProfile): Promise<void> {
  const user = auth.currentUser;

  if (!user) throw new Error("No logged-in user!");

  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, data, { merge: true });
}

// ============================
// GET USER PROFILE
// ============================
export async function getProfile(): Promise<UserProfile | null> {
  const user = auth.currentUser;

  if (!user) return null;

  const docRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return snapshot.data() as UserProfile;
}
