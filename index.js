/* eslint-disable no-undef */
//import routes from './routes/routes'
//import express from 'express'

var express = require('express');
var routes = require('./routes/routes');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use('/', routes);

console.log("Hello World!");

app.listen(8080, () => {
    console.log('Express Intro running on localhost:8080');
});