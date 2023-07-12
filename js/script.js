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

async function apiBible() {
    const options = {
        books: "books",
        booksGn: "books/gn",
        versesCap: "verses/nvi/",
        verses: "verses/nvi/gn/1/1",
    };

    const biblia = await fetch(url + options.books);


    const bibliaJson = await biblia.json();

    arrayBooks(bibliaJson);

    filterBook();
    filterAbrev();
    filterAuthor();
    filterGroup();
    filterVers()

    clickBook(bibliaJson);


}

function clickReset() {
    const reset = document.querySelector("[type='reset']");
    reset.addEventListener("click", () => {
        const header = document.querySelector("header");
        const sectionPrincipal = document.querySelector(".principal");
        const sectionBookSelected = document.querySelector(".book-selected-cap");
        header.classList.remove("hide");
        sectionPrincipal.classList.remove("hide");
        sectionBookSelected.classList.add("hide");

        removeVerses();
    })
}

function removeVerses() {
    const versesNumber = document.querySelectorAll(".book-selected-p");
    for (let v of versesNumber) {
        v.remove();
    }
}

function clickBook(bibliaJson) {
    const book = document.querySelectorAll(`.book`);
    for (const [b, i] of book.entries()) {
        i.addEventListener("click", () => {
            const header = document.querySelector("header");
            const sectionPrincipal = document.querySelector(".principal");
            const sectionBookSelected = document.querySelector(".book-selected-cap");
            header.classList.add("hide");
            sectionPrincipal.classList.add("hide");
            sectionBookSelected.classList.remove("hide");

            for (b; b < book.length; b++) {

                const verseInput = document.querySelector("#vers");
                verseInput.setAttribute("class", `${bibliaJson[b].abbrev.pt}`)

                break;
            }

            arrayCap();

        })
    }

}

function filterBook() {
    const filterBook = document.querySelector("#books");
    const filterCard = document.querySelectorAll(".book");

    filterBook.addEventListener("input", (e) => {
        if (e.value != "") {
            for (let book of filterCard) {
                let bookTitle = book.querySelector("#book-name");
                bookTitle = bookTitle.textContent.toLowerCase();
                let filterBookInput = filterBook.value.toLowerCase();

                if (!bookTitle.includes(filterBookInput)) {
                    book.style.display = "none";
                } else {
                    book.style.display = "block";
                }
            }
        } else {
            return true;
        }
    })
}

function filterAbrev() {
    const filterAbrev = document.querySelector("#abrev");
    const filterCard = document.querySelectorAll(".book");

    filterAbrev.addEventListener("input", (e) => {
        if (e.value != "") {
            for (let book of filterCard) {
                let bookTitle = book.querySelector("#book-abrev");
                bookTitle = bookTitle.textContent.toLowerCase();
                let filterAbrevInput = filterAbrev.value.toLowerCase();

                if (!bookTitle.includes(filterAbrevInput)) {
                    book.style.display = "none";
                } else {
                    book.style.display = "block";
                }
            }
        } else {
            return true;
        }
    })
}

function filterAuthor() {
    const filterAuthor = document.querySelector("#author");
    const filterCard = document.querySelectorAll(".book");

    filterAuthor.addEventListener("input", (e) => {
        if (e.value != "") {
            for (let book of filterCard) {
                let bookTitle = book.querySelector("#book-author-text");
                bookTitle = bookTitle.textContent.toLowerCase();
                let filterAuthorInput = filterAuthor.value.toLowerCase();

                if (!bookTitle.includes(filterAuthorInput)) {
                    book.style.display = "none";
                } else {
                    book.style.display = "block";
                }
            }
        } else {
            return true;
        }
    })
}

function filterGroup() {
    const filterGroup = document.querySelector("#Group");
    const filterCard = document.querySelectorAll(".book");

    filterGroup.addEventListener("input", (e) => {
        if (e.value != "") {
            for (let book of filterCard) {
                let bookTitle = book.querySelector("#book-group-text");
                bookTitle = bookTitle.textContent.toLowerCase();
                let filterGroupInput = filterGroup.value.toLowerCase();

                if (!bookTitle.includes(filterGroupInput)) {
                    book.style.display = "none";
                } else {
                    book.style.display = "block";
                }
            }
        } else {
            return true;
        }
    })
}

function filterVers() {

    const filterBtn = document.querySelector("#submit-filtro-cap");

    filterBtn.addEventListener("click", (e) => {
        e.preventDefault();

        removeVerses();

        const cap = document.querySelector("#cap");
        const capValue = cap.value;
        cap.setAttribute("value", `${capValue}`);

        arrayCap();
        changeCap();

    })

}

function changeCap() {
    const filterVerse = document.querySelector("#vers");
    const filterElement = document.querySelectorAll(".book-selected-p");
    console.log(filterElement)

    if (filterVerse.value != "") {
        for (let versiculo of filterElement) {
            let v = versiculo.querySelector("#book-selected-number");
            v = v.textContent;
            let inputValue = filterVerse.value;

            if (v != inputValue) {
                versiculo.style.display = "none";
            } else {
                versiculo.style.display = "block";
            }
        }
    } else {
    }
}

async function arrayCap() {

    const options = {
        books: "books",
        booksGn: "books/gn",
        versesCap: "verses/nvi/",
        verses: "verses/nvi/gn/1/1",
    };

    const classBookApi = document.querySelector("#vers");
    const classNameBook = classBookApi.className;

    const valueCapApi = document.querySelector("#cap");
    const valueNumberCap = valueCapApi.value;

    const bookApi = classNameBook;
    const capApi = valueNumberCap;


    const bibliaCap = await fetch(url + options.versesCap + `${bookApi.toString()}` + `/${capApi}`);
    const bibliaCapJson = await bibliaCap.json();

    const bookTitle = document.querySelector("#book-selected-title");
    const bookCap = document.querySelector("#book-selected-cap");

    bookTitle.textContent = `${bibliaCapJson.book.name}`;
    bookCap.textContent = `${bibliaCapJson.chapter.number}`;

    const divPai = document.querySelector(".book-selected-text");

    for (let i = 0; i < bibliaCapJson.verses.length; i++) {
        const divBookSelected = document.createElement("div");
        divBookSelected.setAttribute("class", "book-selected-p");
        divPai.appendChild(divBookSelected);

        const versesNumber = document.createElement("p");
        const bookVerses = document.createElement("p");

        versesNumber.setAttribute("id", "book-selected-number");
        bookVerses.setAttribute("id", "book-selected-verses");

        versesNumber.textContent += `${bibliaCapJson.verses[i].number}`;
        bookVerses.textContent += `${bibliaCapJson.verses[i].text} `;

        divBookSelected.appendChild(versesNumber);
        divBookSelected.appendChild(bookVerses);
    }

    clickReset();

}


function arrayBooks(bibliaJson) {
    for (let i = 0; i < bibliaJson.length; i++) {

        const arrayBook = document.querySelector(".array-book");

        const divBook = document.createElement("div");
        divBook.setAttribute("class", "book");
        arrayBook.appendChild(divBook);

        const divBookTitle = document.createElement("div");
        divBookTitle.setAttribute("class", `book-title`);
        divBook.appendChild(divBookTitle);

        const idBookTitle = document.createElement(`h1`);
        idBookTitle.setAttribute("id", `book-name`);
        idBookTitle.textContent = `${bibliaJson[i].name}`;
        divBookTitle.appendChild(idBookTitle);

        const idBookAbrev = document.createElement("p");
        idBookAbrev.setAttribute("id", "book-abrev");
        idBookAbrev.textContent = `${bibliaJson[i].abbrev.pt}`;
        divBookTitle.appendChild(idBookAbrev);

        const divBookInfo0 = document.createElement("div");
        divBookInfo0.setAttribute("class", "book-info");
        divBook.appendChild(divBookInfo0);

        const divBookLine0 = document.createElement("div");
        divBookLine0.setAttribute("class", "book-line");
        divBookInfo0.appendChild(divBookLine0);

        const idBookAuthor = document.createElement("p");
        idBookAuthor.setAttribute("id", "book-author");
        idBookAuthor.textContent = "Autor:";
        divBookLine0.appendChild(idBookAuthor);

        const idBookAuthorText = document.createElement("p");
        idBookAuthorText.setAttribute("id", "book-author-text");
        idBookAuthorText.textContent = `${bibliaJson[i].author}`;
        divBookLine0.appendChild(idBookAuthorText);

        const divBookInfo1 = document.createElement("div");
        divBookInfo1.setAttribute("class", "book-info");
        divBook.appendChild(divBookInfo1);

        const divBookLine1 = document.createElement("div");
        divBookLine1.setAttribute("class", "book-line");
        divBookInfo1.appendChild(divBookLine1);

        const idBookGroup = document.createElement("p");
        idBookGroup.setAttribute("id", "book-group");
        idBookGroup.textContent = "Grupo:";
        divBookLine1.appendChild(idBookGroup);

        const idBookGroupText = document.createElement("p");
        idBookGroupText.setAttribute("id", "book-group-text");
        idBookGroupText.textContent = `${bibliaJson[i].group}`;
        divBookLine1.appendChild(idBookGroupText);

        const divBookInfo2 = document.createElement("div");
        divBookInfo2.setAttribute("class", "book-info");
        divBook.appendChild(divBookInfo2);

        const divBookLine2 = document.createElement("div");
        divBookLine2.setAttribute("class", "book-line");
        divBookInfo2.appendChild(divBookLine2);

        const idBookCap = document.createElement("p");
        idBookCap.setAttribute("id", "book-cap");
        idBookCap.textContent = "Cap:";
        divBookLine2.appendChild(idBookCap);

        const idBookCapText = document.createElement("p");
        idBookCapText.setAttribute("id", "book-cap");
        idBookCapText.textContent = `${bibliaJson[i].chapters}`;
        divBookLine2.appendChild(idBookCapText);
    }
}

apiBible();