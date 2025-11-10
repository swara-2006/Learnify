// src/api/authApi.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import {auth} from '././firebaseConfig'// 🔹 import auth from config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

const USER_KEY = "@user";

const saveUser = async (user: User) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save user", e);
  }
};

export const loadUser = async (): Promise<User | null> => {
  try {
    const userString = await AsyncStorage.getItem(USER_KEY);
    return userString ? JSON.parse(userString) : null;
  } catch (e) {
    console.error("Failed to load user", e);
    return null;
  }
};

export const signUp = async (email: string, password: string, username?: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await saveUser(userCredential.user);
  return userCredential.user;
};

export const login = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await saveUser(userCredential.user);
  return userCredential.user;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  await AsyncStorage.removeItem(USER_KEY);
};
