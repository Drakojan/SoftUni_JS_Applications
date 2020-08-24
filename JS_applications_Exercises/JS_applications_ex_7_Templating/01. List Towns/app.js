let loadBtn = document.getElementById('btnLoadTowns');
let containter = document.getElementById('root')

let inputField = document.getElementById('towns')

loadBtn.addEventListener('click', (e)=>{

    e.preventDefault()

    if (inputField.value ==='') {
        Promise.all([
            fetch('https://restcountries.eu/rest/v2/all').then((x)=>x.json()),
            fetch('./template.hbs').then((r)=>r.text())
        ])
        .then(([countries, templateHBS])=>{
            
            const template = Handlebars.compile(templateHBS);
            const HTML_Element = template({countries});
            containter.innerHTML=HTML_Element;
    
        })
    }
    else {
        let towns = inputField.value.split(', ');
        let arrOfTownObjects = towns.map((x)=>{
            
            return {name:x.toString()}
        
        })
        fetch('./townsTemplate.hbs')
        .then((r)=>r.text())
        .then((templateHBS)=>{
            
            const template = Handlebars.compile(templateHBS);
            const HTML_Element = template({arrOfTownObjects});
            containter.innerHTML=HTML_Element;
        })
    }


})

