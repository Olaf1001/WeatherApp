import { getWeather } from "./apiConnection.js";
const appElements = {};

const getDOMElement = htmlClass => {
    return document.querySelector(htmlClass);
}

const getHTMLElements = () => {
    appElements.searchInput = getDOMElement('.weather-search-input');
    appElements.searchBtn = getDOMElement('.weather-search-btn');
}

const setupListeners = () => {
    appElements.searchInput.addEventListener('keydown', onEnterClick);
    appElements.searchBtn.addEventListener('click', onBtnClick);
}

const onEnterClick = e => {
    if(e.key === 'Enter') {
        let city = appElements.searchInput.value
        getWeather(city).then(data => {
            console.log(data);
        });
    }

}

const onBtnClick = e => {

}


const initializeApp = () => {
    getHTMLElements();
    setupListeners();
}

document.addEventListener('DOMContentLoaded', initializeApp)