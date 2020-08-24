// use liveServer. Also you can attach your own DB in firebase_requests.js if you wish
import {createNewBook, getAllBooks, updateBook, deleteBook, } from "./firebase_requests.js";

function solve () {
    
    let $submitForm = document.getElementsByTagName('form')[0];
    let $submitFormInputs = $submitForm.getElementsByTagName('input');
    let $submitButton = $submitForm.getElementsByTagName('button')[0];

    $submitButton.addEventListener('click', submitHandler)

    function cleanForm() {
        Array.from($submitFormInputs).forEach(x=>x.value='')
    }

    function submitHandler(e) {

        e.preventDefault();

        let newBook = {
            title:$submitFormInputs[0].value,
            author: $submitFormInputs[1].value,
            isnb:$submitFormInputs[2].value,
        }

        createNewBook(newBook)
        .then($loadButton.click())
        .then(cleanForm())
    }

    let $loadButton = document.getElementById('loadBooks');

    let $tableBody = document.getElementsByTagName('tbody')[0];

    $loadButton.addEventListener('click', loadHandler)

    function loadHandler(){

        $tableBody.innerHTML='';
        getAllBooks().then(bigObject=>{

            for (const id in bigObject) {
                
                if (bigObject.hasOwnProperty(id)) {
                    const currentBook = bigObject[id];
                    
                    $tableBody.appendChild(createNewHTMLRow(currentBook,id));
                }
            }

        })

    }

    function createNewHTMLRow(book,id) {
        let Id = id
        let newRow = document.createElement('tr');
        newRow.innerHTML=`                
        <td title="title">${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isnb}</td>
        <td>
            <button title="button" id=${Id}>Edit</button>
            <button>Delete</button>
        </td>`

        let deleteButton = newRow.getElementsByTagName('button')[1];

        deleteButton.addEventListener('click', ()=>{
            deleteBook(Id)
            .then(deleteButton.parentNode.parentNode.remove());
        })

        return newRow;
    }

    $tableBody.addEventListener('click', (e)=>{

        if (e.target.title === "title") {
            // I believe this is what they mean in the task
            let title = e.target.textContent;
            let author = e.target.parentNode.getElementsByTagName('td')[1].textContent;
            let isnb = e.target.parentNode.getElementsByTagName('td')[2].textContent;

            $submitFormInputs[0].value = title
            $submitFormInputs[1].value = author
            $submitFormInputs[2].value = isnb
        }

        else if (e.target.title ==='button') {
            
            let newBook = {
                title:$submitFormInputs[0].value,
                author: $submitFormInputs[1].value,
                isnb:$submitFormInputs[2].value,
            }
            
            updateBook(newBook,e.target.id)
            .then(cleanForm())
            .then(setTimeout(() => {
                $loadButton.click()
            }, 200))
                
        }

    })
}

solve()