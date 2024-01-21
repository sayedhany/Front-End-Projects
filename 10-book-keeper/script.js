const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
let deleteBookmark;
let bookmarks = [];

function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

function closeModal(e) {
  modal.classList.remove("show-modal");
}
function closeModalWithOverlay(e) {
  if (e.srcElement.classList.contains("modal-container")) {
    modal.classList.remove("show-modal");
  }
}

function validate(nameValue, urlValue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("pls Enter valid data");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("enter valid url");
    return false;
  }
  return true;
}

function buildBookmarks() {
  bookmarksContainer.innerHTML = "";
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    const item = document.createElement("div");
    item.innerHTML = `
      <i class="fas fa-times" id="delete-bookmark" title="Delete bookmark"></i>
      <div class="name">
          <img src="https://www.google.com/s2/favicons?domain=${url}&sz=30" alt="${name}">
          <a href="${url}" target="_blank">${name}</a>
      </div>
    `;

    item.classList.add("item");
    bookmarksContainer.appendChild(item);
  });
  document.querySelectorAll("#delete-bookmark").forEach((bookmark) => {
    bookmark.addEventListener("click", removeBookmark);
  });
}

function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Sayed Hany",
        url: "https://www.github.com/sayedhany",
      },
    ];
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  buildBookmarks();
}

function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }
  const isValid = validate(nameValue, urlValue);
  if (!isValid) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

function removeBookmark(e) {
  bookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.name !== e.srcElement.nextElementSibling.children[1].innerHTML
  );
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", closeModalWithOverlay);
bookmarkForm.addEventListener("submit", storeBookmark);

fetchBookmarks();
