import { monkeys } from "./monkeys.js";
( async() => {
    
    let partialText = await fetch(`./singleMonkey.hbs`).then(r=>r.text())
    Handlebars.registerPartial('monkey',partialText);

    let rawTextTemplate = await fetch('./monkeyList.hbs').then(r=>r.text())
    let template = Handlebars.compile(rawTextTemplate)

    let htmlElements = template({monkeys})

    let monkeysWrapper = document.querySelector('div.monkeys');
    console.log(monkeysWrapper);
    monkeysWrapper.innerHTML=htmlElements;

    monkeysWrapper.addEventListener('click',(e)=>{

        if (e.target.className === 'showBtn') {
            
            let div = e.target.nextElementSibling;

            if (div.style.display==='none') {
                div.style.display = 'block';
            }
            else{
                div.style.display = 'none';
            }
        }
    })

})()