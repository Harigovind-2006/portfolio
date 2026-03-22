function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;

  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

updateClock();
setInterval(updateClock, 1000 * 30);