// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,

} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUVNw94Toz2H9qoYS8Gn6Sog9GxvBMyP4",
  authDomain: "learnify-28859.firebaseapp.com",
  projectId: "learnify-28859",
  storageBucket: "learnify-28859.firebasestorage.app",
  messagingSenderId: "459480628501",
  appId: "1:459480628501:web:24e53cc3e8d48ef421bd1c",
  measurementId: "G-6RE3HXJ804"
};
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = initializeAuth(app);

export { app, auth };



