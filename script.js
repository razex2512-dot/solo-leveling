let xp = 0;
let level = 1;
let xpNeeded = 100;

// LOGIN
function login() {
  document.getElementById("loginPage").classList.remove("active");
  document.getElementById("appPage").classList.add("active");
}

// LOGOUT
function logout() {
  document.getElementById("appPage").classList.remove("active");
  document.getElementById("loginPage").classList.add("active");
}

// SWITCH SECTIONS
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// XP SYSTEM
function gainXP(amount) {
  xp += amount;

  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.2);
  }

  updateUI();
}

// UPDATE UI
function updateUI() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
  document.getElementById("xpNeeded").innerText = xpNeeded;

  let percent = (xp / xpNeeded) * 100;
  document.getElementById("xpFill").style.width = percent + "%";
}

updateUI();
