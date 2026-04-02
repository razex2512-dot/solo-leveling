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

function completeMission() {
  xp += 20;

  showPopup("🎉 Quest Completed! +20 XP");

  if (xp >= xpNeeded) {
    levelUp();
  }

  updateUI();
}

function levelUp() {
  xp = xp - xpNeeded;
  level++;
  xpNeeded = Math.floor(xpNeeded * 1.2);

  showPopup("🔥 LEVEL UP! Now Level " + level);
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.innerText = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

updateUI();
