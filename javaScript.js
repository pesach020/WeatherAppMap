let weather;
let city = 'London';

//weather
weather_api(city);
function weather_api(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},uk&appid=cdd104fdbbc3e2addcd9c25dc00d191d`)
        .then(response => response.json())
        .then(data => {
            let temperature_with_long_result = data['main']['temp'];
            // convert from Kelvin to Celsius
            temperature_with_long_result -= 273.15;

            let temperature = temperature_with_long_result.toString().slice(0,-16);
            console.log(temperature);
            console.log(data);
            return  weather = data['weather']['0']['main'] +' ' + temperature +'&#176C';
        });
}

let mymap = L.map('mapid').setView([51.49, -0.13], 8);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGVzYWNoMDIwIiwiYSI6ImNqdjJ6N205cTA0Ym00ZXAyZzZpdXB0NDIifQ.Hgm0-HIyr7ymxDNKDs-1nA'
}).addTo(mymap);

// marker
let marker = L.marker([51.49, -0.13], {
}).addTo(mymap);


//popup
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();


let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);


}
mymap.on('click', onMapClick);

