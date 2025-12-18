import { auth } from "./firebaseauth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export async function logoutUser() {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout failed", error);
  }
}

// Add this line so your HTML onclick can find it
window.logoutUser = logoutUser;