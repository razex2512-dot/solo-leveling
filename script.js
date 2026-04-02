let xp = 0;
let level = 1;
let xpNeeded = 100;

function updateUI() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
  document.getElementById("xpNeeded").innerText = xpNeeded;

  let percent = (xp / xpNeeded) * 100;
  document.getElementById("xpBarFill").style.width = percent + "%";
}

function gainXP(amount) {
  xp += amount;

  if (xp >= xpNeeded) {
    levelUp();
  }

  updateUI();
}

function completeMission() {
  gainXP(20);
}

function levelUp() {
  xp -= xpNeeded;
  level++;
  xpNeeded = Math.floor(xpNeeded * 1.2);

  showArise();
}

function showArise() {
  const arise = document.getElementById("ariseText");
  arise.style.display = "block";

  setTimeout(() => {
    arise.style.display = "none";
  }, 1500);
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

updateUI();
