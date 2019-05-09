'use strict';
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';


const port: number = 8080;
const contentTypes = new Map();

contentTypes.set('html', 'text/html');
contentTypes.set('js', 'text/javascript');
contentTypes.set('css', 'text/css');
contentTypes.set('json', 'application/json');
contentTypes.set('png', 'image/png');

http.createServer(function (req, res) {
    const myUrl: url.Url = url.parse(req.url);
    let extname: string = myUrl.pathname.split('.')[1];

    let fileName: string = myUrl.pathname.substr(1);
    if (fileName === '') {
        fileName = 'index.html';
        extname = 'html';
    }

    const cType: string = contentTypes.get(extname);
    fs.readFile(fileName, function (err, data) {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write('<h1> 404 page!!!</h1>');
            } else {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('<h1>Server Error!!!</h1>');
            }
        } else {
            res.writeHead(200, {'Content-Type': cType});
            res.write(data);
        }
        res.end();
    });
}).listen(port);
console.log(`http://localhost:${port}/`);