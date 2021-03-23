const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const Shelf = require('../models/Shelf');
const router = Router();

router.post('/add', async function (req, res){
    try {
        const {products} = req.body;
        const shelf = new Shelf({products});
        await shelf.save();
        res.status(200).json({message: 'Продукты на полку добавлены'});
    } catch (e) {
        res.status(500).json({message: 'ошибка'});
    }
});

router.get('/', async function (req, res){
    try {
        const shelves = await Shelf.find({});
        res.status(200).json({shelves});
    } catch (e) {
        res.status(500).json({message: 'error'});
    }
});

router.get('/:id', async function (req, res){
    try {
        const id = req.params.id;
        const shelf = await Shelf.findById(id);
        res.status(201).json({shelf});
    } catch (e) {
        res.status(500).json({message: 'Полки с таким id нет'});
    }
});

router.delete('/:id', async function (req, res){
    try {
        const id = req.params.id;
        await Shelf.findByIdAndDelete(id);
        res.status(201).json({message: 'Полка успешно удалена'});
    } catch (e) {
        res.status(500).json({message: 'Продукта с таким id нет'});
    }
});

router.put('/:id', async function (req, res){
    try {
        const id = req.params.id;
        const {products} = req.body;
        await Shelf.updateOne({_id: id}, { $set: { products: products }});
        res.status(201).json({message: 'Продукты на полке обновлены'});
    } catch (e) {
        res.status(500).json({message: 'error'});
    }
});

module.exports = router;