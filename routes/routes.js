/* eslint-disable no-undef */
//import express from 'express';
//import product from '../data/product'
//import productList from '../memory/products.json'
var productList = require('../memory/products.json')
var categories = require('../memory/category.json')
var express = require('express');
var router = express.Router();

let nextId = Math.max.apply(Math, Object.keys(productList).map(n => parseInt(n, 10))) + 1;

function copy(id, { name, description, category, price, weight }) {
    return { id, name, description, category, price, weight };
}

router.get('/', function (req, res) {
    res.send(productList);
})

router.get('/product/:id', function (req, res) {
    if (productList.hasOwnProperty(req.params.id)) {
        res.send(productList[req.params.id])
    }
    else
        res.sendStatus(404);
})

router.get('/pbc/:category', function (req, res) {
    if (productList.hasOwnProperty(req.params.category)) {
        let productsArray = [];
        productList.forEach(async function (product) {
            if (product.category == parseInt(req.params.category)) {
                productsArray.push(product);
            }
        })
        res.send(productsArray)
    }
    else
        res.sendStatus(404);
})

router.get('/category', function (req, res) {
    res.send(categories)

})

router.delete('/product/:id', function (req, res) {
    if (productList.hasOwnProperty(req.params.id)) {
        delete productList[req.params.id];
        productList = productList.filter(function (el) {
            return el != null;
        })
        res.sendStatus(204);
    }
    else
        res.sendStatus(404);
})

router.post('/', function (req, res) {
    const id = nextId++;
    const product = copy(id, req.body || {});
    productList[id] = product;
    res.send(product);
})

router.put('/product/:id', function (req, res) {
    if (productList.hasOwnProperty(req.params.id)) {
        productList[req.params.id] = copy(req.params.id, req.body || {});
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;