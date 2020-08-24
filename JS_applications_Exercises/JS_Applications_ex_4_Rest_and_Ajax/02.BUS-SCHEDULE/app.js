function solve() {

    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');
    let infoBox = document.getElementById('info');
    
    let currentStopId = 'depot';
    let currentStopName = '';

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentStopId}.json`)
        .then(x=>x.json())
        .then((e)=>{
            currentStopName=e.name;
            currentStopId = e.next;

            infoBox.textContent=`Next Stop ${currentStopName}`;

            departButton.disabled=true;
            arriveButton.disabled = false;
        })
        .catch(()=>{
            infoBox.textContent='Error';
            departButton.disabled=true;
            arriveButton.disabled = true;
        });       
        
    }

    function arrive() {

        departButton.disabled=false;
        arriveButton.disabled = true;

        infoBox.textContent=`Arriving at ${currentStopName}`

    }

    return {
        depart,
        arrive
    };
}

let result = solve();