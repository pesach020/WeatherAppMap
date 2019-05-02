const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    let contentType = 'text/html';
    let myUrl = url.parse(req.url, true);

    let filePath = path.join(
        __dirname,
        'public',
        myUrl.pathname === '/' ? 'index.html' : myUrl.pathname.slice(1)
    );

    let extname = myUrl.pathname.split('.')[1];

    switch (extname) {
        case 'js':
            contentType = 'text/javascript';
            break;
        case 'css':
            contentType = 'text/css';
            break;
        case 'json':
            contentType = 'application/json';
            break;
        case 'jpg':
            contentType = 'image/jpeg';
            break;
    }

    if (contentType === 'text/html' && extname === '') {
        filePath += '.html';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            if (extname === 'json' && myUrl.query.q) {
                content = dataHandler(content, myUrl.query.q, myUrl.query.search);
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

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

//
// standalone popup
//    var popup = L.popup()
//        .setLatLng([51.5, -0.09])
//        .setContent("I am a standalone popup.")
//        .openOn(mymap);



let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);


    let coor = e.latlng.toString();
    // seperte to two arguments in array
    let re = /(\s\s)/;

    // push to array
    let ar = coor.split(re);
    console.log('1 ' + ar);


    let coordinator_y = ar[0][7] + ar[0][8];// + ar[0][9] + ar[0][10] + ar[0][11];
    let coordinator_x = ar[0][18] + ar[0][19];// + ar[0][20] + ar[0][21] + ar[0][22];
    //
    console.log('2 ' + coordinator_y);
    console.log('3 ' + coordinator_x);
    // London
    if (coordinator_y === '51' && coordinator_x === '-0' || coordinator_x === '0.') {
        // city === 'london';
        weather_api('london');

        popup
            .setContent("London " + weather)
            .openOn(mymap);
        // Oxford
    } else if (coordinator_y === '51' && coordinator_x === '-1') {
        //  city === 'Oxford';
        weather_api('oxford');
        popup
            .setContent("Oxford " + weather)
            .openOn(mymap);
        // Portsmouth
    }else if(coordinator_y === '50' && coordinator_x === '-1'){
        weather_api('Portsmouth');
        popup
            .setContent("Portsmouth " + weather)
            .openOn(mymap);
    }
}
mymap.on('click', onMapClick);

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
