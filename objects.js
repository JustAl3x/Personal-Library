let myLibrary = [];
const table = document.querySelector("#libraryTable tbody");
const bookForm = document.getElementById("bookForm");

function Book(title, author, pages, beenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.beenRead = beenRead;

    this.getInfo = function() {
        return `${this.title} by ${this.author} has ${this.pages} pages. It is ${beenRead} that it has been read`;
    }
}

Book.prototype.toggleRead = function() {
    this.beenRead = !this.beenRead;
}


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function render() {
    let rows = document.querySelectorAll("td");
    let rowArray = Array.from(rows);

    for (element of rowArray)
        element.remove();

    for (book of myLibrary) {

        let row = document.createElement(`tr`);
        let nameCol = document.createElement("td");
        let authorCol = document.createElement("td");
        let pagesCol = document.createElement("td");
        let readCol = document.createElement("td");
        let readButton = document.createElement("button");
        let deleteCol = document.createElement("td");
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "X";
        deleteButton.classList.toggle("deleteButton")

        readButton.textContent = book.beenRead;
        readButton.classList.toggle("readButton");

        table.appendChild(row);
        row.appendChild(nameCol);
        row.appendChild(authorCol);
        row.appendChild(pagesCol);
        row.appendChild(readCol);
        readCol.appendChild(readButton);
        row.appendChild(deleteCol);
        deleteCol.appendChild(deleteButton);

        nameCol.textContent = book.title;
        authorCol.textContent = book.author;
        pagesCol.textContent = book.pages;  
        //readCol.textContent = book.beenRead;

        let delElement = deleteButton.parentElement.parentElement;  
        let titleElement = delElement.firstElementChild;
        let title = titleElement.textContent;   
        deleteButton.addEventListener("click", () => {  

            let filtered = myLibrary.filter(book => (book.title != title))
            myLibrary = filtered;
            delElement.remove();  

            console.log(myLibrary);
        })

        readButton.addEventListener("click", () => {
            let found = myLibrary.find(book => (book.title == title));
            found.toggleRead();
            readButton.textContent = found.beenRead;
        })
    }
}

function openForm() {
    bookForm.style.display = "block";
}
  
function closeForm() {  
    bookForm.style.display = "none";
}

function retrieveFormData() {
    let titleInput = document.querySelector("#title");
    let authorInput = document.querySelector("#author");
    let pagesInput = document.querySelector("#pages");
    let readTrueInput = document.querySelector("#trueRadio");

    let newTitle = titleInput.value;
    let newAuthor = authorInput.value;
    let newPages = pagesInput.value;
    let readBool = readTrueInput.checked;

    let newBook = new Book(newTitle, newAuthor, newPages, readBool);

    //check that book isn't empty.
    for (variable in newBook) {
        
        if (newBook.variable === "")
            return null;
    }

    return newBook;
}

function submitBook() {
    let book = retrieveFormData();
    if (book != null) {
        addBookToLibrary(book);
    }
    render();
}

document.querySelector("#submit").addEventListener("click", event => {
    submitBook();   
    closeForm();
    event.preventDefault();
})

document.querySelector("#addBook").addEventListener("click", openForm)

//test books.
let LOTR = new Book("LOTR", "Tolkien", 1000, true);
let HP = new Book("Harry Potter", "J.K. Rowling", 874, false);
let IT = new Book("IT", "Stephen King", 1942, false);
let GONE = new Book("Gone", "Steve", 878, true);

addBookToLibrary(LOTR);
addBookToLibrary(HP);
addBookToLibrary(IT);
addBookToLibrary(GONE);


render();
