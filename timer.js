let timerInterval;
let isPaused = false;
let remainingTime = 0;

// Start Button Logic
document.getElementById("start-timer").addEventListener("click", () => {
  const hoursInput = document.getElementById("hours-input").value || 0;
  const minutesInput = document.getElementById("minutes-input").value || 0;
  const secondsInput = document.getElementById("seconds-input").value || 0;
  const timerDisplay = document.getElementById("timer-display");

  // Disable inputs and enable pause/stop buttons
  document.getElementById("start-timer").disabled = true;
  document.getElementById("pause-timer").disabled = false;
  document.getElementById("stop-timer").disabled = false;

  // If resuming from pause
  if (isPaused) {
    isPaused = false;
    startCountdown(remainingTime, timerDisplay);
    return;
  }

  // Convert inputs to total seconds
  let totalTimeInSeconds =
    parseInt(hoursInput) * 3600 +
    parseInt(minutesInput) * 60 +
    parseInt(secondsInput);

  startCountdown(totalTimeInSeconds, timerDisplay);
});

// Pause Button Logic
document.getElementById("pause-timer").addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    isPaused = true;
    document.getElementById("pause-timer").disabled = true;
    document.getElementById("start-timer").disabled = false;
  }
});

// Stop Button Logic
document.getElementById("stop-timer").addEventListener("click", () => {
  clearInterval(timerInterval);
  isPaused = false;
  remainingTime = 0;

  // Reset inputs and display
  document.getElementById("hours-input").value = "";
  document.getElementById("minutes-input").value = "";
  document.getElementById("seconds-input").value = "";
  document.getElementById("timer-display").textContent = "00:00:00";

  // Enable/disable buttons
  document.getElementById("start-timer").disabled = false;
  document.getElementById("pause-timer").disabled = true;
  document.getElementById("stop-timer").disabled = true;
});

// Helper Function to Start Countdown
function startCountdown(totalTimeInSeconds, timerDisplay) {
  timerInterval = setInterval(() => {
    if (totalTimeInSeconds <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's Up!";
      document.getElementById("pause-timer").disabled = true;
      document.getElementById("stop-timer").disabled = true;
      document.getElementById("start-timer").disabled = false;
    } else {
      totalTimeInSeconds--;
      remainingTime = totalTimeInSeconds;

      const hours = Math.floor(totalTimeInSeconds / 3600);
      const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
      const seconds = totalTimeInSeconds % 60;

      timerDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
  }, 1000);
}
