let xp = 0;
let level = 1;
let xpNeeded = 100;

function updateUI() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
  document.getElementById("xpNeeded").innerText = xpNeeded;

  let percent = (xp / xpNeeded) * 100;
  document.getElementById("xpFill").style.width = percent + "%";
}

function gainXP(amount) {
  xp += amount;

  if (xp >= xpNeeded) {
    levelUp();
  }

  updateUI();
}

function levelUp() {
  xp -= xpNeeded;
  level++;
  xpNeeded = Math.floor(xpNeeded * 1.3);

  showArise();
}

function showArise() {
  const arise = document.getElementById("arise");
  arise.style.display = "block";

  setTimeout(() => {
    arise.style.display = "none";
  }, 1500);
}

function switchTab(tab) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(tab).classList.add("active");
}

updateUI();
