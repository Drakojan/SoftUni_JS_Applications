function attachEvents() {
    
    let $locationInput = document.getElementById('location');
    let $submitButton = document.getElementById('submit');
    let $forecastDiv = document.getElementById('forecast');

    console.log('hi'); 

    // $submitButton.click();

    $submitButton.addEventListener('click', (e)=>{

        e.preventDefault();

        $forecastDiv.innerHTML=`
        <div id="current">
            <div class="label">Current conditions</div>
        </div>
        <div id="upcoming">
            <div class="label">Three-day forecast</div>
        </div>`;
        
            let $currentWeather = document.getElementById('current');
            let $upcomingWeather = document.getElementById('upcoming');

        let locationCode

        let weatherIcons = {
            Sunny:'☀',
            'Partly sunny':'⛅',
            Overcast:'☁',
            Rain:'☂',
        }
        
        if ($locationInput.value!=='') {
            
            fetch('https://judgetests.firebaseio.com/locations.json')
            .then((promise)=> promise.json())
            .then((arr)=>{

                let foundObj = arr.find((e)=>e.name===$locationInput.value)
                locationCode = foundObj.code;

                fetch(`https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`)
                .then(x =>x.json())
                .then((a)=>{
                    
                    $currentWeather.innerHTML=`
<div class = "label">Current conditions</div>
<div class = "forecasts">
  <span class = "condition symbol">${weatherIcons[a.forecast.condition]}</span>
  <span class = "condition">
    <span class = "forecast-data">${a.name}</span>
    <span class = "forecast-data">${a.forecast.low}°/${a.forecast.high}°</span>
    <span class = "forecast-data">${a.forecast.condition}</span>
  </span>
  </div>
  </div>`           
                
                })

                fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`)
                .then(x =>x.json())
                .then((a)=>{
    
                    $upcomingWeather.innerHTML=`
<div class = "label">Three day forecast</div>
  <div class = "forecast-info">
    <span class="upcoming">
    </span>
    <span class="upcoming">
    </span>
    <span class="upcoming">
    </span>
  </div>
</div>`
                    let upcomings = $upcomingWeather.getElementsByClassName('upcoming');
                    let counter = 0;
                    Array.from(upcomings).forEach(upcomingDay => {
                        
                        let $newSymbolSpan = document.createElement('span');
                        $newSymbolSpan.className="symbol";
                        $newSymbolSpan.textContent=`${weatherIcons[a.forecast[counter].condition]}`

                        upcomingDay.appendChild($newSymbolSpan);

                        let $newTemperatureSpan = document.createElement('span');
                        $newTemperatureSpan.className="forecast-data";
                        $newTemperatureSpan.textContent = `${a.forecast[counter].low}°/${a.forecast[counter].high}°`

                        upcomingDay.appendChild($newTemperatureSpan);

                        let $newConditionSpan = document.createElement('span');
                        $newConditionSpan.className="forecast-data";
                        $newConditionSpan.textContent = `${a.forecast[counter].condition}`;

                        upcomingDay.appendChild($newConditionSpan);

                        counter++;
                    });
                })

                $forecastDiv.style.display='block'
            })
            .catch(a=>{
                $forecastDiv.innerHTML='<div class = "label", display: inline-block >Error</div>';
                $forecastDiv.style.textAlign='center';
                $forecastDiv.style.display='block'
            })
        }
    })
    
}

attachEvents();