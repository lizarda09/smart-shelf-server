const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Product = require('../models/Product');
const router = Router();

router.post('/addProducts', async function (req, res){
    try {
        const { name, price, count } = req.body;
        const date = new Date();
        const dateOfReceiving = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
        const timeOfReceiving = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const product = new Product({ name, price, count, dateOfReceiving, timeOfReceiving });
        await product.save();
        res.status(201).json({message: 'Продукт добавлен!'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.get('/products', async function (req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.get('/getProductByDay', async function (req, res) {
    try {
        const requiredDay = req.body.dateOfReceiving;
        const product = Product.find({ dateOfReceiving: requiredDay });
        res.status(200).json({product});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});


module.exports = router;