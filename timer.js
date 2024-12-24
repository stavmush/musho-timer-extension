let timerInterval;

document.getElementById("start-timer").addEventListener("click", () => {
  const timerInput = document.getElementById("timer-input").value;
  const timerDisplay = document.getElementById("timer-display");

  if (timerInterval) clearInterval(timerInterval);

  let time = parseInt(timerInput) * 60;
  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's Up!";
    } else {
      time--;
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }, 1000);
});
