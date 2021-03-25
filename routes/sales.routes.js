const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const Product = require('../models/Product');
const Sale = require('../models/Sale');
const router = Router();
const auth = require('../middleware/auth.middleware');
const {Types} = require('mongoose');


router.put('/add', async function (req, res){
    try {
        const { name: nameOfSale, count: countOfProduct } = req.body;
        const purchaseDate = new Date();
        const newSale = new Sale({ name: nameOfSale, count: countOfProduct,  purchaseDate });
        await newSale.save();
        const product = await Product.findOne({ name: nameOfSale } );
        const { count: countFromProductDoc } = product;
        await Product.updateOne({name: nameOfSale}, { $set: {count: countFromProductDoc - countOfProduct}});
        res.status(201).json({message: 'Продукт добавлен в продажи!' });
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

module.exports = router;