/* eslint-disable no-undef */
let dataBase = require('../data/database');
var singleton = require('../util/singleton')
var express = require('express');
var Promise = require('promise')
var router = express.Router();
let CategoryModel = require('../data/models/category')
let cat = new CategoryModel({
    Name: 'Category',
    Description: 'CategoryDesc'
})

var client = singleton.getInstance().client;

cat.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    });


router.get('/', async (req, res, next) => {
    try {
        client.db("OnlineShop").collection("Person").find({}).toArray()
            .then(result => {
                console.log(result);
                res.send(result);
            })
    }
    catch (err) {
        next(err);
    }
})

router.get('/product/:id_prod', function (req, res) {
    try {
        client.db("OnlineShop").collection("Person").find({
            id_prod: parseInt(req.params.id_prod)
        }).toArray()
            .then(result => {
                console.log(result);
                res.send(result);
            })
    }
    catch (err) {
        next(err);
    }
})

router.get('/pbc/:category', async (req, res, next) => {
    try {
        client.db("OnlineShop").collection("Person").find({
            "Category.id_cat": parseInt(req.params.category)
        }).toArray()
            .then(result => {
                console.log(result);
                res.send(result);
            })
    }
    catch (err) {
        next(err);
    }
})


router.get('/category', async (req, res, next) => {
    try {
        client.db("OnlineShop").collection("Person").find({}, { projection: { _id: 0, Category: 1 } }).toArray()
            .then(result => {
                console.log(result);
                res.send(result);
            })
    }
    catch (err) {
        next(err);
    }
})

router.get('/supplier', async (req, res, next) => {
    try {
        client.db("OnlineShop").collection("Person").find({}, { projection: { _id: 0, Supplier: 1 } }).toArray()
            .then(result => {
                console.log(result);
                res.send(result);
            })
    }
    catch (err) {
        next(err);
    }
})


router.delete('/product/:id_prod', function (req, res) {
    try {
        client.db("OnlineShop").collection("Person").deleteOne({
            id_prod: parseInt(req.params.id_prod)
        })
            .then(result => {
                res.sendStatus(204);
            })
    }
    catch (err) {
        res.sendStatus(404);
    }
})

router.post('/', function (req, res) {
    try {
        client.db("OnlineShop").collection("Person").insertOne(req.body)
            .then(result => {
                res.sendStatus(204);
            })
    }
    catch (err) {
        res.sendStatus(404);
    }
})

router.put('/product/:id_prod', function (req, res) {
    try {
        client.db("OnlineShop").collection("Person").findOneAndUpdate(
            { id_prod: parseInt(req.params.id_prod) },
            {
                $set: {
                    id_prod: req.body.id_prod,
                    Name: req.body.Name,
                    Description: req.body.Description,
                    Price: req.body.Price,
                    Weight: req.body.Weight,
                    Category: req.body.Category,
                    Supplier: req.body.Supplier,
                    ImageUrl: req.body.ImageUrl
                }
            },
            {
                upsert: true
            })
            .then(result => {
                res.sendStatus(204);
            })
    }
    catch (err) {
        res.sendStatus(404);
    }
});

module.exports = router;