// BEFORE PUTTING ON GITHUB:
// HIDE API KEY

const api = {
    key: config.MY_KEY,
    base: config.MY_BASE
}

console.log("api key is: " + api.key);

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);


function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}


function getResults(query) {

    fetch(`${api.base}weather?zip=${query}&units=imperial&appid=${api.key}`)
        .then(function (weather) {
            return weather.json();
        }).then(function (data) {
            // Cache the data to use when fetch another API
            var long = data.coord.lon;
            var lat = data.coord.lat;
            // Display City name
            let city = document.querySelector(".city");
            city.innerText = `${data.name}`;
            // Display temperature
            let temp = document.querySelector(".temp");
            temp.innerHTML = `${Math.round(data.main.temp)}<span>°F</span>`;

            return fetch(`${api.base}onecall?lat=${lat}&lon=${long}&units=imperial&appid=${api.key}`)
        }).then(function (weather) {
            return weather.json();
        }).then(function (data) {
            console.log(data.daily[0].temp);
            let morning = document.querySelector(".morning");
            let afternoon = document.querySelector(".afternoon");
            let night = document.querySelector(".night");
            morning.innerHTML = `${Math.round(data.daily[0].temp.morn)}<span>°F</span>`;
            afternoon.innerHTML = `${Math.round(data.daily[0].temp.eve)}<span>°F</span>`;
            night.innerHTML = `${Math.round(data.daily[0].temp.night)}<span>°F</span>`;
        });
}