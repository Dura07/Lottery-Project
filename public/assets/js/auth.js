import { auth, db } from "./firebaseauth.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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
      playerID: playerID,  // Store this for the UI
      uid: user.uid,
      wallet: 0,
      createdAt: new Date()
    });

    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("Register Error:", error);
    alert(error.message);
  }
}


// ================= LOGIN =================
async function loginUser(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // Check if profile exists
    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists()) {
      alert("Profile data not found in database.");
      return;
    }

    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message);
  }
}


// EXPOSE FUNCTIONS TO HTML
window.registerUser = registerUser;
window.loginUser = loginUser;



// REMEMBER ME CHECKBOX
// On Page Load: Check if phone was remembered
window.addEventListener('DOMContentLoaded', () => {
  const savedPhone = localStorage.getItem('rememberedPhone');
  if (savedPhone) {
    document.getElementById('loginPhone').value = savedPhone;
    document.getElementById('rememberMe').checked = true;
  }
});

// Inside Login Submit Event:
const rememberMe = document.getElementById('rememberMe').checked;
if (rememberMe) {
    localStorage.setItem('rememberedPhone', phone);
} else {
    localStorage.removeItem('rememberedPhone');
}



// FORGOT PASSWORD 
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ================= RESET PASSWORD =================
async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    // Map Firebase error codes to user-friendly messages
    let friendlyMessage = "An error occurred. Please try again.";
    
    if (error.code === 'auth/user-not-found') {
      friendlyMessage = "This phone number is not registered.";
    } else if (error.code === 'auth/invalid-email') {
      friendlyMessage = "The phone number format is incorrect.";
    }

    return { success: false, message: friendlyMessage };
  }
}

// EXPOSE TO HTML (This ensures your buttons can see it)
window.resetPassword = resetPassword;