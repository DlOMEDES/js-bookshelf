class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book) {
    const list = document.getElementById('book-list');
      // create row tr el
    const row = document.createElement('tr');
      // insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a class='delete' href='#'>X</a></td>;
    `;
  
    list.appendChild(row);
  }


  showAlert(msgString, className) {
    // create div
    const div = document.createElement('div');
    // add alert class and pass in arg classname
    div.className = `alert ${className}`;
    // append note
    div.appendChild(document.createTextNode(msgString));
    // get parent
    const container = document.querySelector('.container');
    // get form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);
    // timed alert
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000)
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearfields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}


// LOCAL STORAGE
class localStore {
  // fetch books
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  // display books
  static displayBooks() {
    const books = localStore.getBooks();
    books.forEach(function(book) {
      const ui = new UI;

      // add book to UI
      ui.addBook(book);
    })
  }
  // store book
  static addBook(book) {
    const books = localStore.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = localStore.getBooks();
    books.forEach(function(position, index) {
      if(position.isbn === isbn) {
        books.splice(position, 1)
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', localStore.displayBooks);

// SUMBIT EVENT 
document.getElementById('book-form').addEventListener('submit', function(e) {
  e.preventDefault();
// get form values
const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;
// new book instance (instantiating)
const book = new Book(title, author, isbn);
// new ui instance
const ui = new UI();
// validate
if(title === '' || author === '' || isbn === '') {
  // error alert
  ui.showAlert('Fill in all the fields', 'error');
} else {
    // show success alert
  ui.showAlert('Book Added', 'success');
  //add book 
  ui.addBook(book);
  // add to local storage
  localStore.addBook(book);
  // clear all fields
  ui.clearfields();
  }

});


// DELETE EVENT
document.getElementById('book-list').addEventListener('click', function(e) {
  e.preventDefault();
  // another ui instance
  const ui = new UI();
  // target x to delete
  ui.deleteBook(e.target);

  // remove book from storage
  localStore.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book Removed', 'success');
})