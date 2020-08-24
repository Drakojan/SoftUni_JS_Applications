import { cats } from "./catSeeder.js";

(async () => {
    
    let allCatsUl = document.querySelector('#allCats > ul');
    
    let templateText = await fetch('./cat-Template.hbs').then(r=>r.text());

    let template = Handlebars.compile(templateText);

    let genereatedHTML = template({cats});
    allCatsUl.innerHTML=genereatedHTML;

    allCatsUl.addEventListener('click', (e)=>{

        console.log(e.target);
        if (e.target.className === 'showBtn') {
            
            let div = e.target.nextElementSibling;
            console.log(div);

            if (div.style.display==='none') {
                div.style.display = 'block';
                e.target.textContent = 'Hide status code';
            }
            else{
                div.style.display = 'none';
                e.target.textContent = 'Show status code';
            }
        }
    })
})();