import { getWeather } from "./apiConnection.js";
const appElements = {};
const weatherCard = {};

const getDOMElement = htmlClass => {
    return document.querySelector(htmlClass);
}

const createDOMElement = tag => {
    return document.createElement(tag)
}

const getHTMLElements = () => {
    appElements.searchInput = getDOMElement('.weather-search-input');
    appElements.searchBtn = getDOMElement('.weather-search-btn');
    appElements.weatherCardsContainer = getDOMElement('.weather-cards-grid');
}

const setupListeners = () => {
    appElements.searchInput.addEventListener('keydown', onSearchSubmit);
    appElements.searchBtn.addEventListener('click', onSearchSubmit);
}

const onSearchSubmit = e => {
    if(e.key === 'Enter') {
        let city = appElements.searchInput.value
        getWeather(city).then(data => {
            createWeatherCard();
            displayWeather(data);
            console.log(data)
        });
    }

}



const createWeatherCard = () => {
    weatherCard.weatherCardBox = createDOMElement('div');
    weatherCard.weatherCardBox.className = 'weather-card';
    appElements.weatherCardsContainer.appendChild(weatherCard.weatherCardBox);

    weatherCard.weatherCity = createDOMElement('h4');
    weatherCard.weatherCity.className = 'weather-card-city';
    weatherCard.weatherCardBox.appendChild(weatherCard.weatherCity);

    weatherCard.weatherTempBox = createDOMElement('div');
    weatherCard.weatherTempBox.className = 'weather-card-temp';
    weatherCard.weatherCardBox.appendChild(weatherCard.weatherTempBox);

    weatherCard.weatherTemp = createDOMElement('p');
    weatherCard.weatherTempBox.appendChild(weatherCard.weatherTemp);

    weatherCard.weatherSi = createDOMElement('span');
    weatherCard.weatherSi.innerText = '°C';
    weatherCard.weatherTempBox.appendChild(weatherCard.weatherSi);

    weatherCard.weatherOthersBox = createDOMElement('div');
    weatherCard.weatherOthersBox.className = 'weather-card-others flex';
    weatherCard.weatherCardBox.appendChild(weatherCard.weatherOthersBox);

    weatherCard.weatherHumidityBox = createDOMElement('div');
    weatherCard.weatherHumidityBox.className = 'weather-card-humidity flex';
    weatherCard.weatherOthersBox.appendChild(weatherCard.weatherHumidityBox);

    weatherCard.weatherHumadityValue = createDOMElement('span');
    weatherCard.weatherHumidityBox.appendChild(weatherCard.weatherHumadityValue);

    weatherCard.weatherHumadityText = createDOMElement('p');
    weatherCard.weatherHumadityText.innerText = 'Humadity'
    weatherCard.weatherHumidityBox.appendChild(weatherCard.weatherHumadityText);

    weatherCard.weatherPressureBox = createDOMElement('div');
    weatherCard.weatherPressureBox.className = 'weather-card-pressure flex';
    weatherCard.weatherOthersBox.appendChild(weatherCard.weatherPressureBox);

    weatherCard.weatherPressureValue = createDOMElement('span');
    weatherCard.weatherPressureBox.appendChild(weatherCard.weatherPressureValue);

    weatherCard.weatherPressureText = createDOMElement('p');
    weatherCard.weatherPressureText.innerText = 'Pressure'
    weatherCard.weatherPressureBox.appendChild(weatherCard.weatherPressureText);
}

const displayWeather = data => {
    weatherCard.weatherCity.innerText = `${data.name}`;
    weatherCard.weatherTemp.innerText = `${data.main.temp.toFixed(1)}`;
    weatherCard.weatherHumadityValue.innerText = `${data.main.humidity}%`;
    weatherCard.weatherPressureValue.innerText = `${data.main.pressure}hPa`;
}

const initializeApp = () => {
    getHTMLElements();
    setupListeners();

}

document.addEventListener('DOMContentLoaded', initializeApp)

