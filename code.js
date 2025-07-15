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

    const bookInfo = document.createElement("p");
    bookInfo.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}`;
    bookDisplay.appendChild(bookInfo);

    const readStatusContainer = document.createElement("div");
    readStatusContainer.textContent = "Have you read it? ";
    const radioGroupName = `read-status-${book.id}`;

    const yesRadio = document.createElement("input");
    yesRadio.type = "radio";
    yesRadio.name = radioGroupName;
    yesRadio.value = "Yes";
    if (book.read === "Yes") {
      yesRadio.checked = true; // Check this button if the book is read
    }
    const yesLabel = document.createElement("label");
    yesLabel.textContent = "Yes";

    const noRadio = document.createElement("input");
    noRadio.type = "radio";
    noRadio.name = radioGroupName;
    noRadio.value = "No";
    if (book.read === "No") {
      noRadio.checked = true; // Check this button if not read
    }
    const noLabel = document.createElement("label");
    noLabel.textContent = "No";

    readStatusContainer.appendChild(yesRadio);
    readStatusContainer.appendChild(yesLabel);
    readStatusContainer.appendChild(noRadio);
    readStatusContainer.appendChild(noLabel);

    bookDisplay.appendChild(readStatusContainer);

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

function updateReadStatus(bookId, newStatus) {
  const bookToUpdate = myLibrary.find((book) => book.id === bookId);
  if (bookToUpdate) {
    bookToUpdate.read = newStatus;
  }
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
  } else if (
    event.target.type === "radio" &&
    event.target.name.startsWith("read-status-")
  ) {
    const bookIdToUpdate =
      event.target.closest("[data-book-id]").dataset.bookId;
    const newReadStatus = event.target.value;

    updateReadStatus(bookIdToUpdate, newReadStatus);
  }
});
