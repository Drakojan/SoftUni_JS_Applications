import { getInputLocation,catchErrors } from "./htmlOperations.js";

const url = {
    location: () => 'https://judgetests.firebaseio.com/locations.json',
    today: (code) => `https://judgetests.firebaseio.com/forecast/today/${code}.json`,
    upcoming: (code) => `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`
} //Database

export async function getInfo() {
    try {
        let res = await fetch(url.location())
        if (!res) {
            throw new Error()
        }

        let locations = await res.json()
        let location = [...locations].find(x => x.name === getInputLocation())
        let {
            code,
        } = location
        let reses = await Promise.all([fetch(url.today(code)), fetch(url.upcoming(code))])
        reses.forEach(res => {
            if (!res.ok) {
                throw new Error()
            }
        })
        let today = await reses[0].json()

        let upcoming = await reses[1].json()

        return {
            today,
            upcoming
        }
    } catch (error) {
        catchErrors()
    }
}