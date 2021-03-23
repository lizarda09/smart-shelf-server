const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const Product = require('../models/Product');
const router = Router();

router.post('/addProducts', auth, async function (req, res){
    try {
        const { name, price, count, shelfLife} = req.body;
        const date = new Date();
        const dateOfReceiving = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
        const timeOfReceiving = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const product = new Product({ name, price, count, dateOfReceiving, timeOfReceiving, shelfLife });
        await product.save();
        res.status(201).json({message: 'Продукт добавлен!'});
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
        const { name, price, count } = req.body;
        await Product.updateOne({_id: id}, { $set: {name: name, price: price, count: count}});
        res.status(201).json({message: 'Продукт обновлен'});
    } catch (e) {
        res.status(500).json({message: 'Такого id не существует...'});
    }
});

router.delete('/deleteProductById', async function (req, res){
    try {
        const {name} = req.body;
        await Product.remove({name});
        res.status(201).json({message: 'Продукт удален'});
    } catch (e) {
        res.status(500).json({message: 'Продукта с таким названием не существует...'});
    }
});

router.get('/getProductByDay', async function (req, res) {
    try {
        //todo
        res.status(202).json(products);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});


module.exports = router;