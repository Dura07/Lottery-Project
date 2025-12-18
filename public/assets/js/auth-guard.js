import { auth, db } from "./firebaseauth.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Run this on any protected page
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not logged in
    window.location.href = "login.html";
    return;
  }

  // User is logged in, check profile exists
  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) {
    // No profile in Firestore
    await signOut(auth);
    window.location.href = "login.html";
    return;
  }

  // Load user data into page if needed
  const userData = snap.data();
  window.currentUser = userData; // global for page scripts

  // Example: show full name
  const nameEl = document.getElementById("userFullName");
  if (nameEl) nameEl.textContent = userData.fullName;

  // Example: show wallet
  const walletEl = document.getElementById("userWallet");
  if (walletEl) walletEl.textContent = "₦" + userData.wallet;
});
