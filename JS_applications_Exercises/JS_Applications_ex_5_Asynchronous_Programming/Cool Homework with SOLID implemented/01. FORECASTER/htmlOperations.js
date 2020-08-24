import { getInfo } from "./databaseOperations.js";

const selector = {
    location: () => document.getElementById('location'),
    forecast: () => document.getElementById('forecast'),
    current: () => document.getElementById('current'),
    upcoming: () => document.getElementById('upcoming'),
}

const symbol = {
    Sunny: '☀',
    'Partly sunny': '⛅',
    Overcast: '☁',
    Rain: '☂',
    Degrees: '°'

}

function getInputLocation() {
    return selector.location().value
} 

function catchErrors() {
    selector.current().textContent = 'Error'
    selector.upcoming().textContent = ''
    selector.forecast().style.display = 'block'
} 

function element(tag, text, className) {
    let element = document.createElement(tag)
    if (text) {
        element.textContent = text
    }
    if (className) {
        className.forEach(x => element.classList.add(x))
    }
    return element
} 

async function representHTMLWeather() {
    let info = await getInfo()
    if (!info) {
        return
    }
    let {
        today,
        upcoming
    } = info
    selector.current().textContent = ''
    selector.upcoming().textContent = ''
    representHTMLToday(today)
    representHTMLUpcoming(upcoming)
    selector.forecast().style.display = 'block'
}

function representHTMLToday(today) {

    let {
        name,
        forecast: {
            condition,
            high,
            low
        }
    } = today
    let fragment = document.createDocumentFragment()
    //<div class="label">Current conditions</div>
    let label = element('div', 'Current conditions', ['label'])
    fragment.appendChild(label)
    let forecasts = element('div', undefined, ['forecasts'])
    fragment.appendChild(forecasts)

    let conSymbol = element('span', symbol[`${condition}`], ['condition', 'symbol'])
    forecasts.appendChild(conSymbol)

    let conditionContainer = element('span', undefined, ['condition'])
    let nameSpan = element('span', name, ['forecast-data'])
    let minMax = element('span', `${low}/${high}`, ['forecast-data'])
    let conditionSpan = element('span', condition, ['forecast-data'])
    conditionContainer.appendChild(nameSpan)
    conditionContainer.appendChild(minMax)
    conditionContainer.appendChild(conditionSpan)
    forecasts.appendChild(conditionContainer)

    selector.current().appendChild(fragment)
} 

function representHTMLUpcoming(upcoming) {
    let {
        name,
        forecast
    } = upcoming


    let fragment = document.createDocumentFragment()

    let label = element('div', 'Three-day forecast', ['label'])

    fragment.appendChild(label)

    let forecasts = element('div', undefined, ['forecast-info'])
    fragment.appendChild(forecasts)
    forecast.forEach(x => {
        let {
            condition,
            high,
            low
        } = x
        let spanContainer = element('span', undefined, ['upcoming'])
        let conSymbol = element('span', symbol[`${condition}`], ['symbol'])
        let minMax = element('span', `${low}/${high}`, ['forecast-data'])
        let conditionSpan = element('span', condition, ['forecast-data'])
        spanContainer.appendChild(conSymbol)
        spanContainer.appendChild(minMax)
        spanContainer.appendChild(conditionSpan)
        forecasts.appendChild(spanContainer)
    })
    selector.upcoming().appendChild(fragment)
}

export {getInputLocation,catchErrors,representHTMLWeather}