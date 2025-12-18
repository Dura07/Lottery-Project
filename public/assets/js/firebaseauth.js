import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7e1VJr7ftU7ViiUFNKfHPt2GnIkAGOAA",
  authDomain: "pm-lotto.firebaseapp.com",
  projectId: "pm-lotto",
  storageBucket: "pm-lotto.firebasestorage.app",
  messagingSenderId: "198278724618",
  appId: "1:198278724618:web:4bf48de71d7a66106333f3",
  measurementId: "G-D37W1EHNB5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
