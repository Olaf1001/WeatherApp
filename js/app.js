import { getWeather } from "./apiConnection.js";
import { mapListToDOMElements } from "./DOMElements.js";
import { createWeatherCardElement } from "./DOMElements.js";
class WeatherApp {
  constructor() {
    this.viewElements = {};
    this.citiesList = [];
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
  
  insertWeatherCardElement = (where, what, city) => {
    city[where].appendChild(what);
  }

  setupIcon = (name, src, alt, title, tabIndex, city) => {
    let _icon = city[name];
    _icon.src = src;
    _icon.alt = alt;
    _icon.title = title;
    _icon.tabIndex = tabIndex;
  }

  setupCityObject = data => {
    data.name = { 
      city: data.name,
      temp: `${data.main.temp.toFixed(1)}`
     };
    
  }
  setupWeatherCard = data => {
    const cardBox = data.name.weatherCardBox = createWeatherCardElement('weatherCardBox', 'div', 'weather-card', '');
    this.viewElements.weatherCardsContainer.appendChild(cardBox);

    const cardCity = data.name.weatherCity = createWeatherCardElement('weatherCity', 'h4', 'weather-card-city', '');
    this.insertWeatherCardElement('weatherCardBox', cardCity, data.name);
    
    const cardTempBox = data.name.weatherTempBox = createWeatherCardElement('weatherTempBox', 'div', 'weather-card-temp', '');
    this.insertWeatherCardElement('weatherCardBox', cardTempBox, data.name);

    const cardTemp = data.name.weatherTemp = createWeatherCardElement('weatherTemp', 'p', '', '');
    this.insertWeatherCardElement('weatherTempBox', cardTemp, data.name);

    const cardWeatherSi = createWeatherCardElement('weatherSi', 'span', '', '°C');
    this.insertWeatherCardElement('weatherTempBox', cardWeatherSi, data.name);

    const cardBtnBox = data.name.weatherBtnBox = createWeatherCardElement('weatherBtnBox', 'div', 'weather-card-btn-container flex', '');
    this.insertWeatherCardElement('weatherCardBox', cardBtnBox, data.name);

    const cardBtnHeart = data.name.cardBtnHeart = createWeatherCardElement('cardBtnHeart', 'img', 'weather-card-btn--heart-img', '');
    this.setupIcon('cardBtnHeart', './assets/icons/heart-icon.svg', 'Heart icon', 'Add to favorite', 0, data.name);
    this.insertWeatherCardElement('weatherBtnBox', cardBtnHeart, data.name);

    const cardBtnDel = data.name.cardBtnDel = createWeatherCardElement('cardBtnDel', 'img', 'weather-card-btn--del-img', '');
    this.setupIcon('cardBtnDel', './assets/icons/trash-icon.svg', 'Trash icon', 'Remove city from the list', 0, data.name);
    this.insertWeatherCardElement('weatherBtnBox', cardBtnDel, data.name);
  }

  cityRecurrence = data => {
    for (let i = 0; i < this.citiesList.length; i++) {
      if (this.citiesList[i].city == data.name) {
          return true;
      }
    }
    return false;
  } 

  insertWeatherDataIntoCard = data => {
     data.name.weatherCity.innerText = data.name.city;
     data.name.weatherTemp.innerText = data.name.temp;
  }

  insertCityObjectIntoTab = data => {
    this.citiesList.push(data.name);
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
            if(this.cityRecurrence(data)) {
              this.viewElements.searchError.innerText = "This city is already on the list!";
            } else {
              this.setupCityObject(data);
              this.setupWeatherCard(data);
              this.insertWeatherDataIntoCard(data);
              this.insertCityObjectIntoTab(data);
            }
          }
        }).catch(() => {
          this.viewElements.searchError.innerText = "Something went wrong, Please try again";
        })
      } else {
        this.viewElements.searchError.innerText = "Please enter the name of the city";
      }
    }
  };
}

document.addEventListener("DOMContentLoaded", new WeatherApp);
