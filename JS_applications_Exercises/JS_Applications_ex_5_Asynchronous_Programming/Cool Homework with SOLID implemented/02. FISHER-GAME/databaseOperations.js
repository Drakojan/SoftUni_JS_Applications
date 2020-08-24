import { catchError } from "./HTMLOperations.js";

const url = (id) => `https://fisher-game.firebaseio.com/catches/${id ? id : ''}.json`; //database

function getRequest(method, data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    };
} //database

async function dataReques(method, data, id) {
    try {
        let res = await fetch(url(id), getRequest(method, data));
        if (!res.ok) {
            throw new Error();
        }
        let info = await res.json();
        return info;
    }
    catch (error) {
        catchError();
    }
} //database

export{dataReques}

