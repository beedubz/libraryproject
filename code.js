let myLibrary = [];
const openBookDialog = document.getElementById("open-book-dialog-btn");
const closeBookDialog = document.getElementById("close-book-dialog-btn");
const bookDialog = document.getElementById("book-dialog");
const submitBook = document.getElementById("submit");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const yesReadInput = document.getElementById("yes");
const noReadInput = document.getElementById("no");
const form = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showBooks() {
  bookList.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookDisplay = document.createElement("div");
    bookDisplay.dataset.bookId = book.id;
    bookDisplay.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}, Read: ${book.read}`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    bookDisplay.appendChild(deleteButton);
    bookList.appendChild(bookDisplay);
  });
}

function deleteBook(bookId) {
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
  showBooks();
}

const disgrace = new Book("Disgrace", "Coetzee", "840", "Yes");
const blink = new Book("Blink", "Gladwell", "226", "No");

addBookToLibrary(disgrace);
addBookToLibrary(blink);

showBooks();

openBookDialog.addEventListener("click", () => {
  bookDialog.showModal();
});

closeBookDialog.addEventListener("click", () => {
  bookDialog.close();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = document.querySelector('input[name="read"]:checked').value;
  const submittedBook = new Book(title, author, pages, read);
  addBookToLibrary(submittedBook);
  showBooks();
  bookDialog.close();
  form.reset();
});

bookList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const bookIdToDelete =
      event.target.closest("[data-book-id]").dataset.bookId;

    deleteBook(bookIdToDelete);
  }
});
