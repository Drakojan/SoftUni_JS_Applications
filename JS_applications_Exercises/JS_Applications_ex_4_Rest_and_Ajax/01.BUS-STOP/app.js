function getInfo() {
    let stopID = document.getElementById('stopId');
    let stopName = document.getElementById('stopName');
    let bussesList = document.getElementById('buses');

    console.log(stopID.value);
    let value = stopID.value;

    fetch(`https://judgetests.firebaseio.com/businfo/${value.toString()}.json `)
    .then( x => {
        if (x.status!==200) {
            stopName.textContent='Error'
        }
        else return x})
    .then(x=>x.json())
    .then(x=>{
        stopName.textContent=x.name
        console.log(x.buses);
        for (bus in x.buses) {
        
            let newLi = document.createElement('li');
            newLi.textContent = `bus ${bus} arrives in ${x.buses[bus]} minutes`;
            bussesList.appendChild(newLi)
        }
    })
}