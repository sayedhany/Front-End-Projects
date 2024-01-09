// Get Quotes From API.
const newQuoteBtn = document.querySelector(".new-quote");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-button");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");
let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quote.author) {
    authorText.textContent = quote.author;
  } else {
    authorText.textContent = "UnKnown";
  }
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
}

async function getQuotes() {
  loading();
  const url = "https://type.fit/api/quotes";
  try {
    const res = await fetch(url);
    apiQuotes = await res.json();
    newQuote();
  } catch (err) {
    console.log(err);
  }
  complete();
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();
