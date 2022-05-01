const form = document.querySelector('#location')

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let city = document.querySelector('#city').value

    console.log(city)
    await loadData(city)
})


const getData = async (city) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15d7b7e319a0c85c625ca1a39f8ceec7&units=imperial`)
    console.log(response.data)
    return response.data
}
//console.log(getData())

const DOM_Elements = {
    temps: '.temp-list'
}

const createWeather = (city, temp_max, temp_min, humidity, wind, clouds, weather) => {
    const html = `<h1>${city}</h1>
    <div class="card border-info mb-3" style="max-width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">High</h5>
                <p class="card-text">&#8457; ${temp_max}</p>
        </div>
    </div>
    <div class="card border-info mb-3" style="max-width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Low</h5>
                <p class="card-text">&#8457; ${temp_min}</p>
        </div>
    </div>
    <div class="card border-info mb-3" style="max-width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Forcast</h5>
                <p class="card-text">${weather}</p>
        </div>
    </div>
    <div class="card border-info mb-3" style="max-width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Humidity</h5>
                <p class="card-text">${humidity}%</p>
        </div>
    </div>
    <div class="card border-info mb-3" style="max-width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Wind</h5>
                <p class="card-text">${wind} mph</p>
        </div>
    </div>
    <div class="card border-info mb-3" style="max-width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Cloud Cover</h5>
                <p class="card-text">${clouds}%</p>
        </div>
    </div>`
    document.querySelector(DOM_Elements.temps).insertAdjacentHTML('beforeend', html)
}

const loadData = async (city) => {
    clearData()
    const temp = await getData(city);
    createWeather(temp.name, temp.main.temp_max, temp.main.temp_min, temp.main.humidity, temp.wind.speed, temp.clouds.all, temp.weather[0].description)
}

const clearData = () => {
    document.querySelector(DOM_Elements.temps).innerHTML = '';
}