let key = "2cfda1f27f8f18422038c85cc30073ad"
let $current = document.querySelector('#current')
let $hourly = document.querySelector('#hourly')
let $daily = document.querySelector('#daily')
let $timezone = document.querySelector("#timezone")
let $zone = document.querySelector("#zone")
let $temp = document.querySelector("#temp")
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`

getData(url) 
weatherhourly(data)  

weatherdaily(data)


async function getData(url){
    let resp = await fetch(url)
    let data = await resp.json()
    console.log(data)
    weatherhourly(data.hourly)
    weatherdaily(data.daily)
    $zone.textContent = data.timezone
    $temp.textContent = Math.trunc(data.current.temp) + "°"
    $timezone.textContent = data.current.weather[0].description

    }


     function weatherhourly(data){
        data.forEach(element => {
            // console.log(element)
         $hourly.insertAdjacentHTML("beforeend", `
         <div class="hour">
          <p>${new Date().getHours()}</p>
          <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
          <h3>${Math.trunc(element.temp) + '°'}</h3> 
         </div>
         `) 
        });
    }

    function weatherdaily(data){
        data.forEach(element => {
        let weekend = ["Сегодня", "Чт", "Пт", "Сб", "Вс", "Пн", "Вт", "Ср",]
            console.log(element)
            $daily.insertAdjacentHTML('beforeend',`
            <div class="dailychat">
            <p>${weekend[0]}</p>   <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">  <h3 id="max">${Math.trunc(element.temp.max)}</h3> <h3>${Math.trunc(element.temp.min)} </h3>
            </div>
            `)
        })
    }