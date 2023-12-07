let city = {
  lat: 0,
  lon: 0,
  name: ''
}

function makeWeatherRequest () {
  return new Promise(function (resolve, reject) {
    city = JSON.parse(localStorage.getItem('city'))
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + city.lat + '&lon=' + city.lon + '&appid=577b3bd2eec54e5a84a1ae825e746783', true)
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        })
      }
    }
    xhr.send()
  })
}

function findCoordinates () {
  const cityName = document.getElementById('city').value
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=577b3bd2eec54e5a84a1ae825e746783')
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        alert('Такого города не существует!')
        document.getElementById('city').value = ''
      } else {
        city.lat = data[0].lat
        city.lon = data[0].lon
        city.name = data[0].local_names.ru
        localStorage.setItem('city', JSON.stringify(city))
        loadWeather()
      }
    })
}

async function loadWeather () {
  /* let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + city.lat + '&lon=' + city.lon + '&appid=577b3bd2eec54e5a84a1ae825e746783', false);
    xhr.send(); */

  const result = await makeWeatherRequest()

  const response = JSON.parse(result)
  document.getElementById('temperature').innerHTML = response.main.temp + '&#8451;'
  document.getElementById('pressure').innerHTML = response.main.pressure + ' мм.рт.ст'
  document.getElementById('wind').innerHTML = response.wind.speed + ' м/с'

  loadIcon(response.weather[0].icon)
}

async function loadIcon (icon) {
  document.getElementById('weather-icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
}

const currentDate = new Date()
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}
document.getElementById('date').innerHTML = currentDate.toLocaleString('ru', options)
document.getElementById('city').value = JSON.parse(localStorage.getItem('city')).name
loadWeather()
