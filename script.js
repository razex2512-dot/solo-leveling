import { googleLogin, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let userId = null;
let xp = 0;
let level = 1;
let xpNeeded = 100;

// LOGIN
window.loginGoogle = async function () {
  const user = await googleLogin();
  userId = user.uid;

  await loadUserData();
  loadMissions();

  document.getElementById("loginPage").classList.remove("active");
  document.getElementById("appPage").classList.add("active");
};

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

// MISSIONS
const missions = [
  { name: "Push Ups", xp: 20 },
  { name: "Squats", xp: 25 },
  { name: "Running", xp: 30 }
];

function loadMissions() {
  const container = document.getElementById("missions");
  container.innerHTML = "";

  missions.forEach(m => {
    const btn = document.createElement("button");
    btn.innerText = `${m.name} +${m.xp} XP`;
    btn.onclick = () => gainXP(m.xp);
    container.appendChild(btn);
  });
}

// XP SYSTEM
function gainXP(amount) {
  xp += amount;

  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.3);
  }

  updateUI();
  saveData();
}

// UI
function updateUI() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
  document.getElementById("xpNeeded").innerText = xpNeeded;

  let percent = (xp / xpNeeded) * 100;
  document.getElementById("xpFill").style.width = percent + "%";
}

// NAV
window.showSection = function (id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

// LOGOUT
window.logout = function () {
  location.reload();
};
