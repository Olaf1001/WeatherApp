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

  fillWeatherCardWithData = data => {
    this.weatherCard.weatherCity.innerText = `${data.name}`;
    this.weatherCard.weatherTemp.innerText = `${data.main.temp.toFixed(1)}`;
  }

  inputClearing = () => {
    this.viewElements.searchInput.value = "";
    this.viewElements.searchError.innerText = "";
  }

  onSearchSubmit = e => {
    if (e.key === "Enter" || e.type === "click") {
      let city = this.viewElements.searchInput.value;
      if(city !== "") {
        getWeather(city).then(data => {
          if(data.name) {
            this.inputClearing();
            this.setupWeatherCard();
            this.fillWeatherCardWithData(data);
          }
        }).catch(() => {
          this.inputClearing();
          this.viewElements.searchError.innerText = "Something went wrong, Please try again";
        })
      } else {
        this.viewElements.searchError.innerText = "Please enter the name of the city";
      }
    }
  };
}

document.addEventListener("DOMContentLoaded", new WeatherApp);
