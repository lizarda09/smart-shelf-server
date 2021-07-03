const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const Product = require('../models/Product');
const calculateDiscount = require('../businessLogic/discounts');
const router = Router();
const Role = require('../models/Role')

router.post('/add', auth, async function (req, res){
    try {
        const { name, price, count, discount, dateOfManufacture, shelfLife} = req.body;
        const dateOfReceiving = new Date();
        const product = new Product({ name, price, count, discount, dateOfManufacture, dateOfReceiving, shelfLife });
        await product.save();
        res.status(201).json({message: 'Продукт добавлен!'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.post('/:id/checkDiscount', auth, async function (req, res){
    try {
            await calculateDiscount(req, res);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.get('/', auth, async function (req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});


router.get('/getProductByName', auth, async function (req, res){
    try {
        const { name }  = req.body;
        const product = await Product.find({ name: name });
        res.status(201).json(product);
    } catch (e) {
        res.status(505).json({message: 'Продукта с таким названием не существует...'});
    }
});

router.get('/getProductByDay', async function (req, res) {
    try {
        //todo
        const { requiredDay } = req.body;
        const product = await Product.find({ dateOfManufacture: requiredDay });
        res.status(202).json(product);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.delete('/:id', auth, async function (req, res){
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        //await Product.remove({_id: id});
        res.status(201).json({message: 'Продукт удален'});
    } catch (e) {
        res.status(500).json({message: 'Такого id не существует...'});
    }
});

router.put('/:id', auth, async function (req, res){
    try {
        const id = req.params.id;
        const { name, price, count, discount } = req.body;
        await Product.updateOne({_id: id}, { $set: {name: name, price: price, count: count, discount: discount}});
        res.status(201).json({message: 'Продукт обновлен'});
    } catch (e) {
        res.status(500).json({message: 'Такого id не существует...'});
    }
});


module.exports = router;