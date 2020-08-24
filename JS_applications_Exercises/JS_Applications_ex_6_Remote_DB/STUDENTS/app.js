// use liveServer. Also you can attach your own DB in firebase_requests.js if you wish
import { createNewStudent, getAllStudents } from "./firebase_requests.js";

function solve() {

    let $submitFormInputs = Array.from(document.getElementById('form').getElementsByTagName('input'));
    let $tableBody = document.getElementById('body')
    let $submitButton = document.getElementById('add');
    let $loadButton = document.getElementById('load');

    $submitButton.addEventListener('click', submitHandler);

    $loadButton.addEventListener('click',loadHandler);

    function submitHandler(e) {

        e.preventDefault()

        var newStudent = {
            ID: $submitFormInputs[0].value,
            FirstName: $submitFormInputs[1].value,
            LastName: $submitFormInputs[2].value,
            FacultyNumber: $submitFormInputs[3].value,
            Grade: $submitFormInputs[4].value,
        }

        for (const property in newStudent) {
            if (newStudent.hasOwnProperty(property)) {
                const element = newStudent[property];

                if (element === '') {
                    alert('all fields must be filled out')
                    return;
                }

            }
        }

        if (!(Number.isInteger(Number(newStudent.FacultyNumber)) && Number.isInteger(Number(newStudent.ID)) && Number(newStudent.Grade))) {
            console.log(typeof newStudent.FacultyNumber);
                alert('ID and FacultyNumber should be integers and Grade should be a number');
                return;
            }

        createNewStudent(newStudent);

        Array.from($submitFormInputs).forEach(x=>x.value='')
        
        setTimeout(() => {
            loadHandler()
        }, 200);

    }

    function loadHandler(){
        $tableBody.innerHTML = '';

        getAllStudents()
        .then(x=>Array.from(Object.values(x)))
        .then(x=> x.sort((a,b)=>{
            return a.ID-b.ID;
        }))
        .then(sortedArr=>{
            sortedArr.forEach((currentStudent) => {
                $tableBody.appendChild(createNewHTMLRow(currentStudent));
            })
        })
    }

    function createNewHTMLRow(student) {

        let newRow = document.createElement('tr');
        newRow.innerHTML=`                
        <td>${student.ID}</td>
        <td>${student.FirstName}</td>
        <td>${student.LastName}</td>
        <td>${student.FacultyNumber}</td>
        <td>${student.Grade}</td>`

        return newRow;
    }
}

solve()