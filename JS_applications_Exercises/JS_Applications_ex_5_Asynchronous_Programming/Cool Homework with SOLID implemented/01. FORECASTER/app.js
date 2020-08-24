import { representHTMLWeather} from "./htmlOperations.js";

function attachEvents() {

    document.getElementById('submit').addEventListener('click', representHTMLWeather)
   
}

attachEvents();