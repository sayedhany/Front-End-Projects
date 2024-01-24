const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Pause");
}
function displayTime(value) {
  let minutes = Math.floor(value / 60);
  let seconds = Math.floor(value % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}
function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Play");
  } else {
    video.pause();
    showPlayIcon();
  }
}
playBtn.addEventListener("click", togglePlay);

// Progress Bar ---------------------------------- //
function updateProgres() {
  const current = video.currentTime;
  const durationValue = video.duration;
  progressBar.style.width = `${(current / durationValue) * 100}%`;
  duration.textContent = displayTime(durationValue);
  currentTime.textContent = `${displayTime(current)} /`;
}
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}
// Volume Controls --------------------------- //
function changeVolumeIcon(volume) {
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
}
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  video.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  volumeIcon.className = "";
  changeVolumeIcon(volume);
}
function muteVolume() {
  // volumeIcon.className = "";
  if (volumeIcon.classList.contains("fa-volume-mute")) {
    volumeIcon.classList.replace("fa-volume-mute", "fa-volume-up");
    video.volume = 1;
    volumeBar.style.width = `100%`;
    volumeIcon.setAttribute("title", "Mute");
  } else {
    volumeIcon.className = "";
    volumeIcon.classList.add("fas", "fa-volume-mute");
    video.volume = 0;
    volumeBar.style.width = `0`;
    volumeIcon.setAttribute("title", "Unmute");
  }
}
// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}
// Fullscreen ------------------------------- //
let fullScreen = false;
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}
function toggleFullScreen() {
  if (fullScreen) {
    closeFullscreen();
  } else {
    openFullscreen(player);
  }
  fullScreen = !fullScreen;
}
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgres);
video.addEventListener("canplay", updateProgres);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", muteVolume);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullScreen);
