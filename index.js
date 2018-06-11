// BOOK CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI CONSTRUCTOR
function UI() {}

// add book proto
UI.prototype.addBook = function(book) {
  const list = document.getElementById('book-list');

  // create row tr el
  const row = document.createElement('tr');

  // insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><a class='delete' href='#'>X</a></td>;
  `;

  list.appendChild(row);
}


// SHOW ALLERT
UI.prototype.showAlert = function(msgString, className) {
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


// DELETE BOOK
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}


// CLEAR FIELDS
UI.prototype.clearfields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


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

  // clear all fields
  ui.clearfields();
  }

});


// DELETE EVENT
document.getElementById('book-list').addEventListener('click', function(e) {
  e.preventDefault();

  // anther ui instance
  const ui = new UI();
  
  ui.deleteBook(e.target);

  ui.showAlert('Book Removed', 'success');
})