const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");
const input = document.querySelector("input");
const LIGHT = "light";
const DARK = "dark";
function start() {}

function imageMode(mode) {
  image1.src = `img/undraw_proud_coder_${mode}.svg`;
  image2.src = `img/undraw_feeling_proud_${mode}.svg`;
  image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
}

function darkMode() {
  nav.style.backgroundColor = "rgba(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgba(255 255 255 / 50%)";
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.remove("fa-sun");
  toggleIcon.children[1].classList.add("fa-moon");
  imageMode(DARK);
}
function lightMode() {
  nav.style.backgroundColor = "rgba(255 255 255 / 50%)";
  textBox.style.backgroundColor = "rgba(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.remove("fa-moon");
  toggleIcon.children[1].classList.add("fa-sun");
  imageMode(LIGHT);
}

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", DARK);
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", LIGHT);
    lightMode();
  }
}
const mode = localStorage.getItem("theme");
if (mode) {
  if (mode === DARK) {
    darkMode(mode);
    input.checked = true;
  } else {
    lightMode(mode);
    input.checked = false;
  }
  document.documentElement.setAttribute("data-theme", mode);
}
toggleSwitch.addEventListener("change", switchTheme);
