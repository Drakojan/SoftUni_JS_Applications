const selector = {
    angler: () => document.querySelector('#addForm >input[class="angler"]'),
    weight: () => document.querySelector('#addForm >input[class="weight"]'),
    species: () => document.querySelector('#addForm >input[class="species"]'),
    location: () => document.querySelector('#addForm >input[class="location"]'),
    bait: () => document.querySelector('#addForm >input[class="bait"]'),
    captureTime: () => document.querySelector('#addForm >input[class="captureTime"]'),
    catches: () => document.getElementById('catches'),
    anglerUpdate: (id) => document.querySelector(`div[data-id = ${id}] >input[class="angler"]`),
    weightUpdate: (id) => document.querySelector(`div[data-id = ${id}] >input[class="weight"]`),
    speciesUpdate: (id) => document.querySelector(`div[data-id = ${id}] >input[class="species"]`),
    locationUpdate: (id) => document.querySelector(`div[data-id = ${id}] >input[class="location"]`),
    baitUpdate: (id) => document.querySelector(`div[data-id = ${id}] >input[class="bait"]`),
    captureTimeUpdate: (id) => document.querySelector(`div[data-id = ${id}] >input[class="captureTime"]`),
}; //HTML

function getInputData() {
    
    return {
        angler: selector.angler().value.trim(),
        bait: selector.bait().value.trim(),
        captureTime: selector.captureTime().value.trim(),
        location: selector.location().value.trim(),
        species: selector.species().value.trim(),
        weight: selector.weight().value.trim(),
    };
} //HTML

function getUpdateData(id) {
    return {
        angler: selector.anglerUpdate(id).value.trim(),
        bait: selector.baitUpdate(id).value.trim(),
        captureTime: selector.captureTimeUpdate(id).value.trim(),
        location: selector.locationUpdate(id).value.trim(),
        species: selector.speciesUpdate(id).value.trim(),
        weight: selector.weightUpdate(id).value.trim(),
    };
} //HTML

function presentCatches(data) {
    selector.catches().textContent = '';
    if (!data) {
        return;
    }
    let info = Object.keys(data);
    info.forEach(x => {
        let id = x;
        let { angler, bait, captureTime, location, species, weight } = data[x];
        let nextCatch = document.createElement('div');
        nextCatch.classList.add('catch');
        nextCatch.dataset.id = id;
        nextCatch.innerHTML = `<label>Angler</label>
    <input type="text" class="angler" value="${angler}" />
    <hr>
    <label>Weight</label>      
    <input type="number" class="weight" value="${weight}" />
    <hr>
    <label>Species</label>
    <input type="text" class="species" value="${species}" />
    <hr>
    <label>Location</label>
    <input type="text" class="location" value="${location}" />
    <hr>
    <label>Bait</label>
    <input type="text" class="bait" value="${bait}" />
    <hr>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${captureTime}" />
    <hr>
    <button class="update">Update</button>
    <button class="delete">Delete</button>`;
        selector.catches().appendChild(nextCatch);
    });
} //HTML

function catchError() {
    let proba = selector.catches();
    selector.catches().textContent = 'ERROR !!!';
    proba = selector.catches().textContent;
} //html

export {getInputData,getUpdateData,presentCatches,catchError}

