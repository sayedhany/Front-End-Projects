const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const todayDate = new Date().toISOString().split("T")[0];
const form = document.getElementById("coundownForm");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownElBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("ul li span");
const countdownInputTitle = document.getElementById("title");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownValue = Date;
let savedCountdown;
let countdownActive;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

dateEl.setAttribute("min", todayDate);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    countdownElTitle.textContent = savedCountdown.title;

    inputContainer.hidden = true;
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${savedCountdown.title} finished on ${savedCountdown.date}`;
      completeEl.hidden = false;
    } else {
      timeElements[0].textContent = days;
      timeElements[1].textContent = hours;
      timeElements[2].textContent = minutes;
      timeElements[3].textContent = seconds;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }

    // countdownEl.h idden = false;
  }, second);
}

function formSubmited(e) {
  e.preventDefault();
  const { srcElement } = e;
  savedCountdown = {
    title: srcElement[0].value,
    date: srcElement[1].value,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  countdownValue = new Date(savedCountdown.date).getTime();
  if (savedCountdown.date) {
    updateDOM();
  } else {
    alert("enter valid date ");
  }
}

function resetCountdown() {
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true;
  localStorage.removeItem("countdown");
  clearInterval(countdownActive);
  countdownInputTitle.value = "";
  dateEl.value = "";
}

function resorePrvCountdown() {
  if (localStorage.getItem("countdown")) {
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    inputContainer.hidden = true;
    countdownValue = new Date(savedCountdown.date).getTime();
    updateDOM();
  }
}

countdownElBtn.addEventListener("click", resetCountdown);
form.addEventListener("submit", formSubmited);
completeBtn.addEventListener("click", resetCountdown);

resorePrvCountdown();
