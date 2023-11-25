document.addEventListener("DOMContentLoaded", function () {
      loadBooks();
    });

    function loadBooks() {
      const unfinishedBooksContainer = document.getElementById("unfinished-books");
      const finishedBooksContainer = document.getElementById("finished-books");

      const books = JSON.parse(localStorage.getItem("books")) || [];

      unfinishedBooksContainer.innerHTML = "";
      finishedBooksContainer.innerHTML = "";

      books.forEach((book) => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
          finishedBooksContainer.appendChild(bookElement);
        } else {
          unfinishedBooksContainer.appendChild(bookElement);
        }
      });
    }

    function createBookElement(book) {
      const bookElement = document.createElement("li");
      bookElement.className = "book";

      const actionsElement = document.createElement("div");
      actionsElement.className = "book-actions";

      const moveButton = document.createElement("button");
      moveButton.className = "btn";
      moveButton.textContent = book.isComplete ? "Pindahkan ke Belum Selesai" : "Pindahkan ke Selesai";
      moveButton.onclick = function () {
        toggleBookStatus(book);
        loadBooks();
      };

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-delete";
      deleteButton.textContent = "Hapus";
      deleteButton.onclick = function () {
        deleteBook(book);
        loadBooks();
      };

      actionsElement.appendChild(moveButton);
      actionsElement.appendChild(deleteButton);

      bookElement.innerHTML = `
    <strong>${book.title}</strong><br>
    <span>(Penulis: ${book.author}), Tahun Terbit: ${book.year}, Target Selesai: ${book.targetDate || 'Tidak ditentukan'}</span>
  `;
      bookElement.appendChild(actionsElement);

      return bookElement;
    }

    function addBook() {
      const titleInput = document.getElementById("title");
      const authorInput = document.getElementById("author");
      const yearInput = document.getElementById("year");
      const isCompleteCheckbox = document.getElementById("isComplete");
      const targetDateInput = document.getElementById("targetDate");

      const newBook = {
        id: generateId(),
        title: titleInput.value,
        author: authorInput.value,
        year: parseInt(yearInput.value), 
        isComplete: isCompleteCheckbox.checked,
        targetDate: targetDateInput.value,
      };

      const existingBooks = JSON.parse(localStorage.getItem("books")) || [];

      existingBooks.push(newBook);

      localStorage.setItem("books", JSON.stringify(existingBooks));

      titleInput.value = "";
      authorInput.value = "";
      yearInput.value = "";
      isCompleteCheckbox.checked = false;
      targetDateInput.value = "";

      loadBooks();
    }

    function toggleBookStatus(book) {
      book.isComplete = !book.isComplete;

      const existingBooks = JSON.parse(localStorage.getItem("books")) || [];

      const index = existingBooks.findIndex((b) => b.id === book.id);
      existingBooks[index] = book;

      localStorage.setItem("books", JSON.stringify(existingBooks));
    }

    function deleteBook(book) {
      const existingBooks = JSON.parse(localStorage.getItem("books")) || [];

      const updatedBooks = existingBooks.filter(
        (b) => b.id !== book.id
      );

      localStorage.setItem("books", JSON.stringify(updatedBooks));
    }

    function generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  