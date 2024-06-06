export const getWeather = city => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1f7a25bd147a149a0d2b69d958853a3&units=metric`
        ).then( resp => {
            if(resp.ok) {
                return resp.json();
            }
        });
}
