let myLibrary = [];
const table = document.querySelector("#libraryTable");

function Book(title, author, pages, beenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.beenRead = beenRead;

    this.getInfo = function() {
        return `${this.title} by ${this.author} has ${this.pages} pages. It is ${beenRead} that it has been read`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function render() {
    for (book of myLibrary) {
        let row = document.createElement("tr")
        let nameCol = document.createElement("td");
        let authorCol = document.createElement("td");
        let pagesCol = document.createElement("td");
        let readCol = document.createElement("td");

        table.appendChild(row);
        row.appendChild(nameCol);
        row.appendChild(authorCol);
        row.appendChild(pagesCol);
        row.appendChild(readCol);

        nameCol.textContent = book.title;
        authorCol.textContent = book.author;
        pagesCol.textContent = book.pages;
        readCol.textContent = book.beenRead;
    }
}

function openForm() {
    document.getElementById("bookForm").style.display = "block";
}
  
function closeForm() {  
    document.getElementById("bookForm").style.display = "none";
}

document.querySelector("#submit").addEventListener("click", event => {
    closeForm();
    event.preventDefault();
})

document.querySelector("#addBook").addEventListener("click", openForm)

//test books.
let LOTR = new Book("LOTR", "Tolkien", 1000, true);
let HP = new Book("Harry Potter", "J.K. Rowling", 874, false);
addBookToLibrary(LOTR);
addBookToLibrary(HP);

render();