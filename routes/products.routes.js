const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const Product = require('../models/Product');
const calculateDiscount = require('../businessLogic/discounts');
const router = Router();

router.post('/add', auth, async function (req, res){
    try {
        const { name, price, count, discount, dateOfManufacture, shelfLife} = req.body;
        //const date = new Date();
        //const dateOfReceiving = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
        const dateOfReceiving = new Date();
        const product = new Product({ name, price, count, discount, dateOfManufacture, dateOfReceiving, shelfLife });
        await product.save();
        res.status(201).json({message: 'Продукт добавлен!'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.post('/:id/checkDiscount', async function (req, res){
    try {
            await calculateDiscount(req, res);
            /*
            const id = req.params.id;
            const product = await Product.findById(id);
            const {dateOfManufacture, price, shelfLife} = product;
            const today = new Date();
            const arrDateOfManufacture = dateOfManufacture.split('-');
            const dayOfExpiration = +arrDateOfManufacture[2] + (shelfLife/24);
            const dateOfExpiration = new Date(Date.parse(`${+arrDateOfManufacture[0]}-${+arrDateOfManufacture[1]}-${dayOfExpiration + 1}`));
            const diff = Math.round((dateOfExpiration - today)/(1000*60*60*24));
            let newPrice, percent;
            switch (diff) {
                case 0:
                    newPrice = +price / 2;
                    await Product.updateOne({_id: id}, { $set: { price: newPrice }});
                    res.status(200).json({message: 'Скидка 50%'});
                    break;
                case 1:
                    percent = +price / 100 * 30;
                    newPrice = price - percent;
                    await Product.updateOne({_id: id}, { $set: { price: newPrice }});
                    res.status(200).json({message: 'Скидка 30%'});
                    break;
                case 2:
                    percent = +price / 100 * 15;
                    newPrice = price - percent;
                    await Product.updateOne({_id: id}, { $set: { price: newPrice }});
                    res.status(200).json({message: 'Скидка 15%'});
                    break;
                case 3:
                    percent = +price / 10;
                    newPrice = price - percent;
                    await Product.updateOne({_id: id}, { $set: { price: newPrice }});
                    res.status(200).json({message: 'Скидка 10%'});
                    break;
                default:
                    res.status(200).json({message: 'Скидки нет'});
             */

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
        const { name, price, count, discount } = req.body;
        await Product.updateOne({_id: id}, { $set: {name: name, price: price, count: count, discount: discount}});
        res.status(201).json({message: 'Продукт обновлен'});
    } catch (e) {
        res.status(500).json({message: 'Такого id не существует...'});
    }
});

router.delete('/deleteProductByName', auth,async function (req, res){
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