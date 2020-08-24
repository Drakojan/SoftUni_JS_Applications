function attachEvents() {
    
    $sendButton = document.getElementById('submit');
    $refreshButton = document.getElementById('refresh');

    $textArea = document.getElementById('messages');

    $inputName = document.getElementById('author');
    $inputMessage = document.getElementById('content');

    $sendButton.addEventListener('click', ()=>{

        let name = $inputName.value;
        let message = $inputMessage.value;

        let newEntry = {
            'author': name,
            'content': message,
          }
          

        fetch(`https://rest-messanger.firebaseio.com/messanger.json`,{

            method: 'POST',
            body: JSON.stringify(newEntry),

        })

            
        
        $inputName.value = '';
        $inputMessage.value='';

    })

    $refreshButton.addEventListener('click', ()=>{

        $textArea.textContent = '';

        fetch(`https://rest-messanger.firebaseio.com/messanger.json`)
        .then(x=>x.json())
        .then(messagesObject=>{

            for (const key in messagesObject) {
                if (messagesObject.hasOwnProperty(key)) {
                    const authorMessagePair = messagesObject[key];
                    $textArea.textContent += `${authorMessagePair.author}: ${authorMessagePair.content}\n`;
                }
            }

        })
        .then(x=>$textArea.textContent = $textArea.textContent.trim())//this is just to remove the last newLine
        
    })
}

attachEvents();