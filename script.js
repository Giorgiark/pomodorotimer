// Global variables
let timeLeft = 25 * 60; // seconds
let timerInterval;
let currentInterval = 'pomodoro';
let backgroundColor = '#F1F1EF'; // Default background color
let fontColor = '#37352F'; // Default font color

// DOM elements
const timeLeftEl = document.getElementById('time-left');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const pomodoroIntervalBtn = document.getElementById('pomodoro-interval-btn');
const shortBreakIntervalBtn = document.getElementById('short-break-interval-btn');
const longBreakIntervalBtn = document.getElementById('long-break-interval-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.querySelector('.close-btn');
const backgroundColorSelect = document.getElementById('background-color');
const fontColorSelect = document.getElementById('font-color');
const saveBtn = document.getElementById('save-btn');

// Event listeners for interval buttons
pomodoroIntervalBtn.addEventListener('click', () => {
  currentInterval = 'pomodoro';
  timeLeft = 25 * 60;
  updateTimeLeftTextContent();
});

shortBreakIntervalBtn.addEventListener('click', () => {
  currentInterval = 'short-break';
  timeLeft = 5 * 60;
  updateTimeLeftTextContent();
});

longBreakIntervalBtn.addEventListener('click', () => {
  currentInterval = 'long-break';
  timeLeft = 10 * 60;
  updateTimeLeftTextContent();
});

// Event listener for start/stop button
startStopBtn.addEventListener('click', () => {
  if (startStopBtn.textContent === 'Start') {
    startTimer();
    startStopBtn.textContent = 'Stop';
  } else {
    stopTimer();
  }
});

// Event listener for reset button
resetBtn.addEventListener('click', () => {
  stopTimer();
  if (currentInterval === 'pomodoro') {
    timeLeft = 25 * 60;
  } else if (currentInterval === 'short-break') {
    timeLeft = 5 * 60;
  } else {
    timeLeft = 10 * 60;
  }
  updateTimeLeftTextContent();
  startStopBtn.textContent = 'Start';
});

// Event listener for settings button
settingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'flex';
});

// Event listener for close button in the settings modal
closeModalBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

// Event listener for save button in the settings modal
saveBtn.addEventListener('click', () => {
  const newBackgroundColor = backgroundColorSelect.value;
  const newFontColor = fontColorSelect.value;

  // Save preferences to localStorage
  localStorage.setItem('backgroundColor', newBackgroundColor);
  localStorage.setItem('fontColor', newFontColor);

  // Apply the new saved preferences
  applyUserPreferences();

  // Close the modal after saving preferences
  settingsModal.style.display = 'none';
});

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimeLeftTextContent();
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      if (currentInterval === 'pomodoro') {
        timeLeft = 5 * 60;
        currentInterval = 'short-break';
        startTimer();
      } else if (currentInterval === 'short-break') {
        timeLeft = 10 * 60;
        currentInterval = 'long-break';
        startTimer();
      } else {
        timeLeft = 25 * 60;
        currentInterval = 'pomodoro';
      }
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  startStopBtn.textContent = 'Start';
}

// Function to update the time left text content
function updateTimeLeftTextContent() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeLeftEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to apply the user's saved preferences
function applyUserPreferences() {
  // Retrieve user preferences from localStorage
  const savedBackgroundColor = localStorage.getItem('backgroundColor');
  const savedFontColor = localStorage.getItem('fontColor');

  // Apply the preferences if they exist in localStorage
  if (savedBackgroundColor) {
    backgroundColor = savedBackgroundColor;
  }

  if (savedFontColor) {
    fontColor = savedFontColor;
  }

  // Apply the preferences to the Pomodoro Timer widget
  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = fontColor;
  timeLeftEl.style.color = fontColor;
  // Update the buttons' font and background color
  const buttons = document.querySelectorAll('.interval-btn, #start-stop-btn, #reset-btn, #settings-btn');
  buttons.forEach((button) => {
    button.style.color = fontColor;
    button.style.backgroundColor = backgroundColor;
    button.style.borderColor = fontColor;
  });
}

// Apply user preferences on page load
applyUserPreferences();