const _getDOMElement = (htmlID) => {
  return document.getElementById(htmlID);
};

export const mapListToDOMElements = (IDs) => {
  const _viewElements = {};

  for (const id of IDs) {
    _viewElements[id] = _getDOMElement(id);
  }

  return _viewElements;
};

const _createDOMElement = (tag) => {
    return document.createElement(tag);
};

export const createWeatherCardElement = (name, tag, className, text) => {
    const _weatherCard = {};
  
    _weatherCard[name] = _createDOMElement(tag);
    _weatherCard[name].className = className;
    _weatherCard[name].innerText = text;
  
    return _weatherCard[name];
};

