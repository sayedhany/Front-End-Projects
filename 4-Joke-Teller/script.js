// VoiceRSS Javascript SDK
const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

const jokeApi =
  "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
function toggleButton() {
  button.disabled = !button.disabled;
}

async function getJoke() {
  try {
    const res = await fetch(jokeApi);
    const data = await res.json();

    if (data.setup) {
      const joke = `${data.setup} ... ${data.delivery}`;
      speech(joke);
    } else {
      speech(data.joke);
    }
    toggleButton();
  } catch (err) {
    console.log(err);
  }
}

function speech(joke) {
  VoiceRSS.speech({
    key: "bdc80444d438450982378c3ee1f1d7ff",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
