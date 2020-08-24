import { dataReques } from "./databaseOperations.js";
import { getInputData,getUpdateData,presentCatches } from "./HTMLOperations.js";

const actions = {
    load: async () => {
        let data = await dataReques('GET')
        presentCatches(data)
    },
    add: async () => {
        let data = getInputData()
        if (dataControl(data)) {
            return
        }
        await dataReques('POST', data)
        let info = await dataReques('GET')
        presentCatches(info)
    },
    update: async (e) => {
        let id = e.target.parentElement.dataset.id
        let data = getUpdateData(id)
        if (dataControl(data)) {
            return
        }
        await dataReques('PUT', data, id)
        let info = await dataReques('GET')
        presentCatches(info)
    },
    delete: async (e) => {
        let id = e.target.parentElement.dataset.id
        await dataReques('DELETE', undefined, id)
        let info = await dataReques('GET')
        presentCatches(info)
    },
} //event

function dataControl(data){
    if (data.angler ==="") {
        alert('Angler cannot be empty')
       return true
    }
    if (data.species ==="") {
        alert('Species cannot be empty')
       return true
    }
    if (data.location ==="") {
        alert('Location cannot be empty')
       return true
    }
    if (data.bait ==="") {
        alert('Bait cannot be empty')
       return true
    }
    if (isNaN(data.weight)||data.weight===''||Number(data.weight)<=0) {
        alert ('Weight must be positive number')
        return true
    }
    // if (data.captureTime===''||Number(data.captureTime)<=0||!Number.isInteger(data.captureTime)) {
    //     let int = !Number.isInteger(data.captureTime)
    //     alert ('Capture Time must be positive integer number')
    //     return true
    // }
}

function eventHandler(e) {
    const className = e.target.className
    e.preventDefault()
    if (typeof actions[className] === 'function') {
        actions[className](e)
    }
} //event

function attachEvents() {
    document.addEventListener('click', eventHandler)
} //event

attachEvents();