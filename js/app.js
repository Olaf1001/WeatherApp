import { getWeather } from "./apiConnection.js";
import { mapListToDOMElements } from "./DOMElements.js";
import { createWeatherCardElement } from "./DOMElements.js";
class WeatherApp {
  constructor() {
    this.viewElements = {};
    this.weatherCard = {};
    this.initializeApp();
  }

  initializeApp = () => {
    this.linkDOMElements();
    this.setupListeners();
  };

  linkDOMElements = () => {
    const IDs = Array.from(document.querySelectorAll("[id]")).map(
      (element) => element.id
    );
    this.viewElements = mapListToDOMElements(IDs);
  };

  setupListeners = () => {
    this.viewElements.searchInput.addEventListener("keydown", this.onSearchSubmit);
    this.viewElements.searchBtn.addEventListener("click", this.onSearchSubmit);
  };
  
  insertWeatherCardElement = (where, what) => {
    this.weatherCard[where].appendChild(what);
  }

  setupWeatherCard = () => {
    const cardBox = this.weatherCard.weatherCardBox = createWeatherCardElement('weatherCardBox', 'div', 'weather-card', '');
    this.viewElements.weatherCardsContainer.appendChild(cardBox);

    const cardCity = this.weatherCard.weatherCity= createWeatherCardElement('weatherCity', 'h4', 'weather-card-city', '');
    this.insertWeatherCardElement('weatherCardBox', cardCity);
    
    const cardTempBox = this.weatherCard.weatherTempBox = createWeatherCardElement('weatherTempBox', 'div', 'weather-card-temp', '');
    this.insertWeatherCardElement('weatherCardBox', cardTempBox);

    const cardTemp = this.weatherCard.weatherTemp = createWeatherCardElement('weatherTemp', 'p', '', '');
    this.insertWeatherCardElement('weatherTempBox', cardTemp);

    const cardWeatherSi = createWeatherCardElement('weatherSi', 'span', '', '°C');
    this.insertWeatherCardElement('weatherTempBox', cardWeatherSi);
    
  }

  fillWeatherCardWithData = (data) => {
    this.weatherCard.weatherCity.innerText = `${data.name}`;
    this.weatherCard.weatherTemp.innerText = `${data.main.temp.toFixed(1)}`;
  }

  onSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      let city = this.viewElements.searchInput.value;
      getWeather(city).then((data) => {
        this.setupWeatherCard();
        this.fillWeatherCardWithData(data);
      });
    }
  };
}

document.addEventListener("DOMContentLoaded", new WeatherApp);
