const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

const initialLoad = true;
let ready = false;
let imageLoaded = 0;
let totalImages = 0;
const count = 5;
const apiKey = "SOZuXYIGVPYgXvXnbzfPO1biW59Wrlh4cFAX4H8Hu8w";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  imageLoaded += 1;
  if (imageLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    totalImages = photosArray.length;
    imageLoaded = 0;
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.aly_description);
    // img.setAttribute("title", photo.aly_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", (e) => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;

    getPhotos();
  }
});
getPhotos();
