// timer.js

// Check if the timer bar already exists to prevent duplicates
if (!document.getElementById("timer-bar")) {
  // Create the timer bar container
  const timerBar = document.createElement("div");
  timerBar.id = "timer-bar";

  // Add the HTML structure for the timer bar
  timerBar.innerHTML = `
    <div>
      <input type="number" id="hours-input" placeholder="Hours" min="0">
      <input type="number" id="minutes-input" placeholder="Minutes" min="0">
      <input type="number" id="seconds-input" placeholder="Seconds" min="0">
      <button id="start-timer">Start</button>
      <button id="pause-timer" disabled>Pause</button>
      <button id="stop-timer" disabled>Stop</button>
      <span id="timer-display">00:00:00</span>
    </div>
  `;

  // Append the timer bar to the top of the page
  document.body.appendChild(timerBar);

  // Timer variables
  let timerInterval;
  let isPaused = false;
  let remainingTime = 0;

  // Event listener for the Start button
  document.getElementById("start-timer").addEventListener("click", () => {
    const hoursInput = document.getElementById("hours-input").value || 0;
    const minutesInput = document.getElementById("minutes-input").value || 0;
    const secondsInput = document.getElementById("seconds-input").value || 0;
    const timerDisplay = document.getElementById("timer-display");

    // Disable inputs and enable pause/stop buttons
    document.getElementById("start-timer").disabled = true;
    document.getElementById("pause-timer").disabled = false;
    document.getElementById("stop-timer").disabled = false;

    if (isPaused) {
      isPaused = false;
      startCountdown(remainingTime, timerDisplay);
      return;
    }

    let totalTimeInSeconds =
      parseInt(hoursInput) * 3600 +
      parseInt(minutesInput) * 60 +
      parseInt(secondsInput);

    startCountdown(totalTimeInSeconds, timerDisplay);
  });

  // Event listener for the Pause button
  document.getElementById("pause-timer").addEventListener("click", () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      isPaused = true;
      document.getElementById("pause-timer").disabled = true;
      document.getElementById("start-timer").disabled = false;
    }
  });

  // Event listener for the Stop button
  document.getElementById("stop-timer").addEventListener("click", () => {
    clearInterval(timerInterval);
    isPaused = false;
    remainingTime = 0;

    document.getElementById("hours-input").value = "";
    document.getElementById("minutes-input").value = "";
    document.getElementById("seconds-input").value = "";
    document.getElementById("timer-display").textContent = "00:00:00";

    document.getElementById("start-timer").disabled = false;
    document.getElementById("pause-timer").disabled = true;
    document.getElementById("stop-timer").disabled = true;
  });

  // Function to handle countdown logic
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
}