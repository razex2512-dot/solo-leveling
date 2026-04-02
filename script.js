import { googleLogin, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let userId = null;
let xp = 0;
let level = 1;
let xpNeeded = 100;

// LOGIN
async function loginGoogle() {
  const user = await googleLogin();
  userId = user.uid;

  await loadUserData();

  document.getElementById("loginPage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
}

// LOAD DATA
async function loadUserData() {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();
    xp = data.xp;
    level = data.level;
    xpNeeded = data.xpNeeded;
  } else {
    await setDoc(ref, { xp: 0, level: 1, xpNeeded: 100 });
  }

  updateUI();
}

// SAVE DATA
async function saveData() {
  const ref = doc(db, "users", userId);
  await setDoc(ref, { xp, level, xpNeeded });
}
