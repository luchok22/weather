let key = "2cfda1f27f8f18422038c85cc30073ad"
let $current = document.querySelector('#current')
let $hourly = document.querySelector('#hourly')
let $daily = document.querySelector('#daily')
let $timezone = document.querySelector("#timezone")
let $zone = document.querySelector("#zone")
let $temp = document.querySelector("#temp")
let $max = document.querySelector("#max")
let $min = document.querySelector("#min")
let $select = document.querySelector("select")
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`

getData(url) 

let city = [
    {
        name: "Бишкек",
        lat: 42.882004,
        lon: 74.582748
    },{
        name: "ОШ",
        lat: 40.52828,
        lon: 72.7985
    },
    {
        name:"New-York",
        lat: 40.730610,
        lon: -73.935242
    }
]

let days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
]
let hours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
]


async function getData(url){
    let resp = await fetch(url)
    let data = await resp.json()
    // console.log(data)
    weatherhourly(data.hourly)
    weatherdaily(data.daily)
    weatherCurrent(data.current)
    }

    function weatherCurrent(data){
        $timezone.innerHTML = ""
    $timezone.insertAdjacentHTML('beforeend', `
    <div class="timp">
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <p>${data.weather[0].description}</p>
    </div>
    `)
    // $temp.textContent = Math.trunc(data.temp) + "°"
    // $timezone.textContent = data.weather[0].description
    }

     function weatherhourly(data){
        $hourly.innerHTML = ""
        data.forEach((element, index) => {
            // console.log(element)
         $hourly.insertAdjacentHTML("beforeend", `
         <div class="hour">
          <p>${index == 0 ? "сейчас" : hours[new Date().getHours() + index]}</p>
          <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
          <h3>${Math.trunc(element.temp) + '°C'}</h3> 
         </div>
         `) 
        });
    }

    function weatherdaily(data){
        $daily.innerHTML = ""
        data.forEach((element, index) => {
          
            // console.log(element)
            $daily.insertAdjacentHTML('beforeend',`
            <div class="dailychat">
            <p>${index == 0 ? "Сегодня" : days[new Date().getDay() + index]}</p>
             <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">  <h3 id="max">${Math.trunc(element.temp.max)}</h3> <h3>${Math.trunc(element.temp.min)} </h3>
            </div>
            `)
        })
    }

    
$select.addEventListener('change', function(){
    let elem = city.find(elem => elem.name == $select.value)
    // console.log(elem)
    let lat = elem.lat
    let lon = elem.lon
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${key}`
    getData(url)
})