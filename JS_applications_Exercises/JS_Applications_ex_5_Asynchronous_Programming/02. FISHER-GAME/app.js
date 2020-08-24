function attachEvents() {

    let catches = document.getElementById('catches');

    let addForm = document.getElementById('addForm');

    let inputs = {

        angler:addForm.getElementsByClassName('angler')[0],
        weight:addForm.getElementsByClassName('weight')[0],
        species:addForm.getElementsByClassName('species')[0],
        location:addForm.getElementsByClassName('location')[0],
        bait:addForm.getElementsByClassName('bait')[0],
        captureTime:addForm.getElementsByClassName('captureTime')[0],
    }

    let buttons = {
        load: document.getElementsByClassName('load')[0],
        add: document.getElementsByClassName('add')[0],
    }

    buttons.load.addEventListener('click', (e)=>{

        fetch('https://fisher-game.firebaseio.com/catches.json')
        .then(x=>x.json())
        .then(x=>{

            catches.innerHTML='';
            for (const id in x) {
                if (x.hasOwnProperty(id)) {
                    const el = x[id];
                    
                    let newEntry = document.createElement('div');
                    newEntry.className="catch";
                    newEntry.setAttribute('data-id',`${id}`);
                    newEntry.innerHTML=`
<label>Angler</label>
<input type="text" class="angler" value=${el.angler} />
<hr>
<label>Weight</label>      
<input type="number" class="weight" value=${el.weight} />
<hr>
<label>Species</label>
<input type="text" class="species" value=${el.species} />
<hr>
<label>Location</label>
<input type="text" class="location" value=${el.location} />
<hr>
<label>Bait</label>
<input type="text" class="bait" value=${el.bait} />
<hr>
<label>Capture Time</label>
<input type="number" class="captureTime" value=${el.captureTime} />
<hr>
<button class="update">Update</button>
<button class="delete">Delete</button>
</div>`
                    catches.appendChild(newEntry);


                }
            }
        })
    })

    buttons.add.addEventListener('click', (e)=>{

        let newCatch = {
            "angler":inputs.angler.value, 
            "weight":inputs.weight.value,
            "species":inputs.species.value,
            "location":inputs.location.value,
            "bait":inputs.bait.value,
            "captureTime":inputs.captureTime.value
        }
        try {
            for (const key in newCatch) {
                if (newCatch.hasOwnProperty(key)) {
                    const element = newCatch[key];
                    if (element==='') {
                        throw new Error('input fields can not be empty');
                        
                    }
                }
            }

            fetch('https://fisher-game.firebaseio.com/catches.json',{
                method: 'POST',
                body: JSON.stringify(newCatch)
            })
            .then(e=>buttons.load.click())
            
        } catch (error) {
            console.log(error.message);
        }

                       

        
        for (const key in inputs) {
            if (inputs.hasOwnProperty(key)) {
                inputs[key].value='';
                
            }
        }

    })

    catches.addEventListener('click',(e)=>{

        let nodeToChange = e.target.parentNode;

        let catchId = nodeToChange.getAttribute('data-id');

        if (e.target.className==='delete') {

            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`,{
                method: "Delete"
            })

            nodeToChange.remove();
        }

        else if (e.target.className==='update') {

            let updateInputs = {

                angler:nodeToChange.getElementsByClassName('angler')[0],
                weight:nodeToChange.getElementsByClassName('weight')[0],
                species:nodeToChange.getElementsByClassName('species')[0],
                location:nodeToChange.getElementsByClassName('location')[0],
                bait:nodeToChange.getElementsByClassName('bait')[0],
                captureTime:nodeToChange.getElementsByClassName('captureTime')[0],
            }

            let updatedObject = {
                "angler":updateInputs.angler.value, 
                "weight":updateInputs.weight.value,
                "species":updateInputs.species.value,
                "location":updateInputs.location.value,
                "bait":updateInputs.bait.value,
                "captureTime":updateInputs.captureTime.value
            }

            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`,{
                method: "Put",
                body: JSON.stringify(updatedObject)
            })
        }
    })
}

attachEvents();

