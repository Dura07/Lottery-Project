import { auth, db } from "./firebaseauth.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= REGISTER =================
async function registerUser(fullName, phone, email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    const playerID = "PM" + Math.floor(100000 + Math.random() * 900000);

    // Save extra user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      phone,
      email,
      playerID: playerID,
      uid: user.uid,
      wallet: 0,
      createdAt: new Date()
    });

    // --- SUCCESS MESSAGE LOGIC ---
    const regMessage = document.getElementById('regMessage');
    if (regMessage) {
      regMessage.innerText = "Account created successfully! Redirecting to Dashboard...";
      regMessage.style.color = "#28a745"; // Success Green
      regMessage.style.backgroundColor = "#d4edda"; // Light green background
      regMessage.style.padding = "10px";
      regMessage.style.borderRadius = "5px";
    }

    // Wait 2 seconds so they can celebrate their new account
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);

  } catch (error) {
    console.error("Register Error:", error);
    
    // Friendly error handling
    const regMessage = document.getElementById('regMessage');
    if (regMessage) {
      let msg = error.message;
      if (error.code === 'auth/email-already-in-use') {
        msg = "This phone number is already registered.";
      }
      regMessage.innerText = msg;
      regMessage.style.color = "red";
      regMessage.style.backgroundColor = "transparent";
    }
  }
}
// ================= LOGIN =================
async function loginUser(email, password, phone) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // Handle Remember Me Logic
    const rememberCheckbox = document.getElementById('rememberMe');
    if (rememberCheckbox && rememberCheckbox.checked) {
      localStorage.setItem('rememberedPhone', phone);
    } else {
      localStorage.removeItem('rememberedPhone');
    }

    // Check if profile exists
    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists()) {
      alert("Profile data not found in database.");
      return;
    }

    // --- NEW LOGIC STARTS HERE ---
    // 1. Find the message div on the login page
    const loginMessage = document.getElementById('loginMessage');
    if (loginMessage) {
        loginMessage.innerText = "Login successful! Redirecting...";
        loginMessage.style.color = "green";
    }

    // 2. Wait for 1.5 seconds so the user can actually read the message
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1500); 
    // --- NEW LOGIC ENDS HERE ---

  } catch (error) {
    console.error("Login Error:", error);
    throw error; // Pass the error back to login.html to display
  }
}

// ================= RESET PASSWORD =================
async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    let friendlyMessage = "An error occurred. Please try again.";
    if (error.code === 'auth/user-not-found') {
      friendlyMessage = "This phone number is not registered.";
    } else if (error.code === 'auth/invalid-email') {
      friendlyMessage = "The phone number format is incorrect.";
    }
    return { success: false, message: friendlyMessage };
  }
}

// ================= EXPOSE FUNCTIONS =================
window.registerUser = registerUser;
window.loginUser = loginUser;
window.resetPassword = resetPassword;

// ================= AUTO-FILL REMEMBERED PHONE =================
window.addEventListener('DOMContentLoaded', () => {
  const loginPhoneInput = document.getElementById('loginPhone');
  const rememberCheckbox = document.getElementById('rememberMe');
  const savedPhone = localStorage.getItem('rememberedPhone');
  
  if (savedPhone && loginPhoneInput) {
    loginPhoneInput.value = savedPhone;
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }
});