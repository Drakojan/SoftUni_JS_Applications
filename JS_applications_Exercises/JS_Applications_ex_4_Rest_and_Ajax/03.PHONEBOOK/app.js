function attachEvents() {

    let $loadButton = document.getElementById('btnLoad');
    let $phonebookUL = document.getElementById('phonebook');

    let $createButton = document.getElementById('btnCreate');
    let $inputPerson = document.getElementById('person');
    let $inputPhone = document.getElementById('phone');

    $loadButton.addEventListener('click', ()=>{

        $phonebookUL.innerHTML='';

        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
        .then(x=>x.json())
        .then(x=>{

            for (const key in x) {
                if (x.hasOwnProperty(key)) {
                    const phonePair = x[key];

                    let newEntry = `${phonePair.person}: ${phonePair.phone}`;

                    let newLi = document.createElement('li');
                    newLi.textContent = newEntry;

                    var button = document.createElement("button");
                        button.innerHTML = "Delete";
                        button.addEventListener('click', ()=>{

                            fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`, {
                                method: 'delete'
                            })
                            setTimeout(() => {
                                $loadButton.click();
                            }, 200); 
                            //Just clicking the button here. Probably better to extract a load function 
                            // to pass to the eventListener and invoke it. Timeout is to make sure DB 
                            // has time to update before the next fetch.  
                                                       
                        })

                    newLi.appendChild(button);
                    $phonebookUL.appendChild(newLi);
                    
                }
            }

        })

    })

    $createButton.addEventListener('click', ()=>{

        let person = $inputPerson.value;
        let phone = $inputPhone.value;

        let newEntry = {
            "person": person,
            "phone": phone
        }
            console.log(newEntry);
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', {
            method: 'POST',
            body:JSON.stringify(newEntry)
        })

        $inputPerson.value = '';
        $inputPhone.value= '';
        setTimeout(() => {
            $loadButton.click();
        }, 200);

    })

    // $phonebookUL.addEventListener('click', (e)=>{

    //     if (e.target.innerHTML === 'Delete') {
            
    //         fetch('https://phonebook-nakov.firebaseio.com/phonebook/<key>.json')
    //     }
    // })

}

attachEvents();