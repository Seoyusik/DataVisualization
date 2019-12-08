var express = require('express');
var app = express();
var csvtojson=require('csvtojson')
var fs=require('fs')


var port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
    res.header('Access-Control-Allow-Headers', 'content-type, id');
    next();
});

app.get('/1', function (req, res) {
  fs.readFile('./data/2015-2018월별 사망자수 집계.csv', function(err, data) {
    res.writeHead(200, {"Content-Type": "file"});
        res.write(data);
        res.end();
    });
});
app.get('/2', function (req, res) {
  fs.readFile('./data/2월_10월 시간별 사망자수 집계.csv', function(err, data) {
    res.writeHead(200, {"Content-Type": "file"});
        res.write(data);
        res.end();
    });
});
app.get('/3', function (req, res) {
  fs.readFile('./data/월별 사망자수 합계.csv', function(err, data) {
    res.writeHead(200, {"Content-Type": "file"});
        res.write(data);
        res.end();
    });
});
app.get('/4', function (req, res) {
  fs.readFile('./data/2월_10월_18시_사고유형 집계.csv', function(err, data) {
    res.writeHead(200, {"Content-Type": "file"});
        res.write(data);
        res.end();
    });
});
app.get('/5', function (req, res) {
  fs.readFile('./data/2월_10월_18시_횡단중_사고횟수_ 집계.csv', function(err, data) {
    res.writeHead(200, {"Content-Type": "file"});
        res.write(data);
        res.end();
    });
});

app.get('/', function (req, res) {
    res.send({msg:"hello d3"});
});

app.listen(port, function () {
    console.log('running server on port ' + port)
});
