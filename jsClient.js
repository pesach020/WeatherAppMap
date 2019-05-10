'use strict';
let temperature;
let description;
let wind;
let humidity;
let city_name;
let map_zoom = 6;
const focus_lat = 51.14;
const focus_lon = -1.61;
const accessToken = 'pk.eyJ1IjoicGVzYWNoMDIwIiwiYSI6ImNqdjJ6N205cTA0Ym00ZXAyZzZpdXB0NDIifQ.Hgm0-HIyr7ymxDNKDs-1nA';

// weather-api
function get_weather_from_api(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},uk&appid=cdd104fdbbc3e2addcd9c25dc00d191d`)
        .then(response => response.json())
        .then(data => {
            //get city name
            city_name = data['name'];
            //get temperature
            let temperature_with_long_result = data['main']['temp'];
            // convert from Kelvin to Celsius
            temperature_with_long_result -= 273.15;
            // get only numbers before dot
            temperature = temperature_with_long_result.toString().split('.')[0];
            // get description
            description = data['weather']['0']['description'];
            // get humidity
            humidity = data['main']['humidity'];
            // get wind speed
            wind = data['wind']['speed'];
            // get coordinators of city
            let coord_lat = data['coord']['lat'];
            let coord_lon = data['coord']['lon'];
            // set data to html
            set_Weather();
            //make focus
            mymap.setView([coord_lat, coord_lon], 8.7);
        });
}

// load map to html
let mymap = L.map('mapid').setView([focus_lat, focus_lon], map_zoom);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    minZoom: 1,
    id: 'mapbox.streets',
    accessToken: accessToken
}).addTo(mymap);


// red marker
function redMarker(lat, lon) {
    let redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    L.marker([lat, lon], {icon: redIcon}).addTo(mymap);
}

let london = L.marker([51.49, 0.13]).addTo(mymap);
let portsmouth = L.marker([50.80, -1.07]).addTo(mymap);
let oxford = L.marker([51.74, -1.29]).addTo(mymap);
let brighton = L.marker([50.82, -0.14]).addTo(mymap);
let canterbury = L.marker([51.28, 1.07]).addTo(mymap);
let manchester = L.marker([53.47, -2.24]).addTo(mymap);
let liverpool = L.marker([53.40, -2.97]).addTo(mymap);
let birmingham = L.marker([52.48, -1.89]).addTo(mymap);

// show the weather by click on the map
function onMapClick(e) {
    let popup = L.popup();
    popup
        .setLatLng(e.latlng);

    let coor = e.latlng.toString();
    // push to array
    coor = coor.split(/(\s\s)/);
    // get coordinators
    let coordinator_y = coor[0][7] + coor[0][8] + coor[0][9] + coor[0][10];
    let coordinator_x = coor[0][18] + coor[0][19];

    // London
    if (coordinator_y === '51.4' || coordinator_y === '51.5' && coordinator_x === '-0') {
        get_weather_from_api('london');
        mymap.removeLayer(london);
        redMarker(51.49, 0.13);
        // Portsmouth
    } else if (coordinator_y === '50.8' && coordinator_x === '-1') {
        get_weather_from_api('Portsmouth');
        mymap.removeLayer(portsmouth);
        redMarker(50.80, -1.07);
        // Oxford
    } else if (coordinator_y === '51.7' && coordinator_x === '-1') {
        get_weather_from_api('Oxford');
        mymap.removeLayer(oxford);
        redMarker(51.74, -1.29);
        // Brighton
    } else if (coordinator_y === '50.8' && coordinator_x === '-0') {
        get_weather_from_api('Brighton');
        mymap.removeLayer(brighton);
        redMarker(50.82, -0.14);
        // Canterbury
    } else if (coordinator_y === '51.2' && coordinator_x === '1.') {
        get_weather_from_api('Canterbury');
        mymap.removeLayer(canterbury);
        redMarker(51.28, 1.07);
        // Manchester
    } else if (coordinator_y === '53.4' && coordinator_x === '-2') {
        get_weather_from_api('Manchester');
        mymap.removeLayer(manchester);
        redMarker(53.47, -2.24);
        // Liverpool
    } else if (coordinator_y === '53.3' && coordinator_x === '-2') {
        get_weather_from_api('Liverpool');
        mymap.removeLayer(liverpool);
        redMarker(53.40, -2.97);
        //  Birmingham
    } else if (coordinator_y === '52.4' && coordinator_x === '-1') {
        get_weather_from_api('Birmingham');
        mymap.removeLayer(birmingham);
        redMarker(52.48, -1.89);
    }
}
mymap.on('click', onMapClick);

// show weather info by select from drop-down list
function cities(select_city) {
    switch (select_city) {
        case 'london':
            get_weather_from_api('london');
            mymap.removeLayer(london);
            redMarker(51.49, 0.13);
            break;
        case 'Portsmouth':
            get_weather_from_api('Portsmouth');
            mymap.removeLayer(portsmouth);
            redMarker(50.80, -1.07);
            break;
        case 'Oxford':
            get_weather_from_api('Oxford');
            mymap.removeLayer(oxford);
            redMarker(51.74, -1.29);
            break;
        case 'Brighton':
            get_weather_from_api('Brighton');
            mymap.removeLayer(brighton);
            redMarker(50.82, -0.14);
            break;
        case 'Canterbury':
            get_weather_from_api('Canterbury');
            mymap.removeLayer(canterbury);
            redMarker(51.28, 1.07);
            break;
        case 'Manchester':
            get_weather_from_api('Manchester');
            mymap.removeLayer(manchester);
            redMarker(53.47, -2.24);
            break;
        case 'Liverpool':
            get_weather_from_api('Liverpool');
            mymap.removeLayer(liverpool);
            redMarker(53.40, -2.97);
            break;
        case 'Birmingham':
            get_weather_from_api('Birmingham');
            mymap.removeLayer(birmingham);
            redMarker(52.48, -1.89);
            break;
    }
}

// set data to html
function set_Weather() {
    document.getElementById("City_id").innerHTML = ' ' + city_name;
    document.getElementById("Temperature_id").innerHTML = ' ' + temperature + '&#176C';
    document.getElementById("Description_id").innerHTML = ' ' + description;
    document.getElementById("Humidity_id").innerHTML = ' ' + humidity;
    document.getElementById("Wind_id").innerHTML = ' ' + wind;
}
