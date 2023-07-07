const url = `https://www.abibliadigital.com.br/api/`;

//section
const sectionPrincipal = document.querySelector(".principal");
const sectionBook = document.querySelector(".book-selected-cap");
const sectionVerse = document.querySelector(".book-selected-verse");

//form
const form = document.querySelector("form");

const Book = document.querySelector(".book");
const bookTitle = document.querySelector(".book-title");
const bookName = document.querySelector(".book-name");
const bookAbrev = document.querySelector(".book-abrev");

async function apiBible(){
    const options = {
        books: "books",
        booksGn: "books/gn",
        versesCap: "verses/nvi/gn/1",
        verses: "verses/nvi/gn/1/1",
    };

    const  biblia = await fetch(url + options.books);


    const bibliaJson = await biblia.json();
    console.log(bibliaJson);

    for(let books in bibliaJson){
        const book = document.createElement(".div.book");
        sectionPrincipal.form.appendChild(book);
        console.log(sectionPrincipal)
    }

}

apiBible();