const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audio = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

let isPlaying = false;

let songIndex = 0;

function playSong() {
  isPlaying = true;
  audio.play();
  play.setAttribute("title", "pause");
  play.classList.replace("fa-play", "fa-pause");
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  play.setAttribute("title", "play");
  play.classList.replace("fa-pause", "fa-play");
}

play.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

function prevSong() {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  loadSong(songs[songIndex]);
  playSong();
  // loadSong[songs[songIndex++]];
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const width = (currentTime / duration) * 100;
    progress.style.width = `${width}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 9) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 9) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}
function setProgressBar(e) {
  const width = e.offsetX / this.clientWidth;
  const { duration } = audio;
  audio.currentTime = width * duration;
}
loadSong(songs[songIndex]);

prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
