import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCHtcNL0k1ybH9wM1E8_T66B0DoroRVrwA",
  authDomain: "react-ecommerce-app-c99d3.firebaseapp.com",
  projectId: "react-ecommerce-app-c99d3",
  storageBucket: "react-ecommerce-app-c99d3.appspot.com",
  messagingSenderId: "16006719003",
  appId: "1:16006719003:web:5f2d76cc021c211337fabe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
