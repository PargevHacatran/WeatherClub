let block = document.querySelector('.weather__block');
let input = document.querySelector('.header__input');
let query = '';
let days = 3;
let treeDaysWeather = document.querySelector('.tree__days');
let oneDayWeather = document.querySelector('.one__day');
let hourlyWeather = document.querySelector('.hourly__weather');
let navAtDays = document.querySelectorAll('.nav-at-day');
const day = document.querySelectorAll('.day')

treeDaysWeather.addEventListener('click', activeElement);
oneDayWeather.addEventListener('click', activeElement);
hourlyWeather.addEventListener('click', activeElement);

function activeElement(){
    navAtDays.forEach(elem => elem.classList.remove('active'));
    this.classList.add('active');
}

input.addEventListener('keydown', (event) =>{

    if(event.key === 'Enter'){ 
        query = input.value.split(' ').map(word => {
            word.split('')
            return [word[0].toUpperCase(), word.slice(1)].join('');
        }).join('-');
        input.value = '';
    }

    let url = `http://api.weatherapi.com/v1/forecast.json?q=${query}&days=${days}&key=530e37354a344f3193e52912230506`;

    const treeDaysForecast = () =>{

        days = 3;

        fetch(url)
            .then(resp => { return resp.json()})
            .then(data => {

                for(let i = 0; i < data.forecast.forecastday.length; i++){

                    let content = `
                            <p class="day__data">${data.forecast.forecastday[i].date}</p>
                            <img src="${data.forecast.forecastday[i].day.condition.icon}" alt="Weather icon" class="day__img" />
                            <p class="day__about__weather">${data.forecast.forecastday[i].day.condition.text}</p>
                            <p class="day-wind__speed">Wind speed:${data.forecast.forecastday[i].day.maxwind_kph} kph</p>
                            <p class="day-maxtemp">Max temp: ${data.forecast.forecastday[i].day.maxtemp_c}&deg</p>
                            <p class="day-mintemp">Min temp: ${data.forecast.forecastday[i].day.mintemp_c}&deg</p>
                            <p class="day-humidity">Humidity: ${data.forecast.forecastday[i].day.avghumidity}%</p>
                        `

                    day[i].innerHTML = content;
                    day[i].classList.add('day__height')
                }
            })
            .catch(error => console.error(error)); 

    }

    const dayForecast = () => {
        days = 1;

        fetch(url)
            .then(resp => { return resp.json()})
            .then(data => {

                    let content = `
                            <p class="day__data">${data.forecast.forecastday[0].date}</p>
                            <img src="${data.forecast.forecastday[0].day.condition.icon}" alt="Weather icon" class="day__img" />
                            <p class="day__about__weather">${data.forecast.forecastday[0].day.condition.text}</p>
                            <p class="day-wind__speed">Wind speed:${data.forecast.forecastday[0].day.maxwind_kph} kph</p>
                            <p class="day-maxtemp">Max temp: ${data.forecast.forecastday[0].day.maxtemp_c}&deg</p>
                            <p class="day-mintemp">Min temp: ${data.forecast.forecastday[0].day.mintemp_c}&deg</p>
                            <p class="day-humidity">Humidity: ${data.forecast.forecastday[0].day.avghumidity}%</p>
                        `

                    day[1].innerHTML = content;
                    day[1].classList.add('day__height')
                
            })
            .catch(error => console.error(error)); 

    }

    const hourlyForecast = () => {
        
        days = 1;

        fetch(url)
            .then(resp => { return resp.json()})
            .then(data => {
                
                    console.log(data);

                    let nightWeather = document.querySelector('.night__weather');
                    let morningWeather = document.querySelector('.morning__weather');
                    let dayWeather = document.querySelector('.day__weather');
                    let eveningWeather = document.querySelector('.evening__weather');

                    const dayHour = [nightWeather, morningWeather, dayWeather, eveningWeather];

                    for(let i = 0; i < data.forecast.forecastday[0].hour.length; i++){

                        if(i % 6 == 0){
                            let content = `
                                    <p class="hourly__data">${data.forecast.forecastday[0].hour[i].time}</p>
                                    <img src="${data.forecast.forecastday[0].hour[i].condition.icon}" alt="Weather icon" class="hourly__img" />
                                    <p class="hourly-about__weather">${data.forecast.forecastday[0].hour[i].condition.text}</p>
                                    <p class="hourly__wind-speed">Wind speed: ${data.forecast.forecastday[0].hour[i].wind_kph}kph</p>
                                    <p class="hourly__temp">Temp: ${data.forecast.forecastday[0].hour[i].temp_c}&deg</p>
                                    <p class="hourly__humidity">Humidity: ${data.forecast.forecastday[0].hour[i].humidity}%</p>
                                `
                                
                                if(i == 6){
                                    morningWeather.innerHTML = content;
                                } else if(i == 12){
                                    dayWeather.innerHTML = content;
                                } else if (i == 18){
                                    eveningWeather.innerHTML = content;
                                } else if (i == 0) {
                                    nightWeather.innerHTML = content;
                                }
                        }

                    }
            })
            .catch(error => console.error(error)); 
    }

    treeDaysWeather.classList.contains('active') ? treeDaysForecast() : oneDayWeather.classList.contains('active') ? dayForecast() : hourlyForecast();
});