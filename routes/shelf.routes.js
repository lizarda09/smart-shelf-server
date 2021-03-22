const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const Shelf = require('../models/Shelf');
const router = Router();

router.post('/addShelf', async function (req, res){
    try {
        const products = req.body;
        const shelf = new Shelf({products});
        await shelf.save();
        res.status(200).json({shelf});
    } catch (e) {
        res.status(500).json({message: 'error'})
    }
});

module.exports = router;