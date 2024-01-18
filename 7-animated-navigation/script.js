const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");

function toggleNav() {
  menuBars.classList.toggle("change");
  // overlay.style.transform = "translateX(0)";
  overlay.classList.toggle("overlay-slide-right");
  if (overlay.classList.contains("overlay-slide-right")) {
    nav1.classList.replace("slide-out-1", "slide-in-1");
    nav2.classList.replace("slide-out-2", "slide-in-2");
    nav3.classList.replace("slide-out-3", "slide-in-3");
    nav4.classList.replace("slide-out-4", "slide-in-4");
    nav5.classList.replace("slide-out-5", "slide-in-5");
  } else {
    nav2.classList.add("slide-out-2");
    nav2.classList.remove("slide-in-2");
    nav3.classList.add("slide-out-3");
    nav3.classList.remove("slide-in-3");
    nav4.classList.add("slide-out-4");
    nav4.classList.remove("slide-in-4");
    nav5.classList.add("slide-out-5");
    nav5.classList.remove("slide-in-5");
  }
}

menuBars.addEventListener("click", toggleNav);
nav1.addEventListener("click", toggleNav);
nav2.addEventListener("click", toggleNav);
nav3.addEventListener("click", toggleNav);
nav4.addEventListener("click", toggleNav);
nav5.addEventListener("click", toggleNav);
