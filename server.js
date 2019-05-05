const http = require('http');
const fs = require('fs');
const url = require('url');

let fileName = './public/index.html';
let contentType = 'text/html';

http.createServer(function (req, res) {
    let myUrl = url.parse(req.url, true);
    let extname = myUrl.pathname.split('.')[1];
    if (extname === 'js') {
        contentType = 'text/javascript';
        fileName = './public/jsClient.js';
    }
    else if(extname === 'css'){
        contentType = 'text/css';
        fileName = './public/style.css';
    }
    else {
        contentType = 'text/html';
        fileName = './public/index.html';
    }
    fs.readFile(fileName, function (err, data) { //'.'+req.url
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.write("<h1> 404 page!!!</h1>");
            res.end();
        } else {

            res.writeHead(200, {'content-Type': contentType})
            res.write(data + '');
            res.end();
        }


    })

}).listen(8080);
console.log("http://localhost:8080/");