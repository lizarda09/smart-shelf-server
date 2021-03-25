const Product = require('../models/Product');

async function calculateDiscount(req, res) {
    const id = req.params.id;
    const product = await Product.findById(id);
    const {dateOfManufacture, price, shelfLife} = product;
    const today = new Date();
    const arrDateOfManufacture = dateOfManufacture.split('-');
    const dayOfExpiration = +arrDateOfManufacture[2] + (shelfLife / 24);
    const dateOfExpiration = new Date(Date.parse(`${+arrDateOfManufacture[0]}-${+arrDateOfManufacture[1]}-${dayOfExpiration + 1}`));
    const diff = Math.round((dateOfExpiration - today) / (1000 * 60 * 60 * 24));
    let newPrice, percent;
    switch (diff) {
        case 0:
            newPrice = +price / 2;
            await Product.updateOne({_id: id}, {$set: {price: newPrice}});
            res.status(200).json({message: 'Скидка 50%'});
            break;
        case 1:
            percent = +price / 100 * 30;
            newPrice = price - percent;
            await Product.updateOne({_id: id}, {$set: {price: newPrice}});
            res.status(200).json({message: 'Скидка 30%'});
            break;
        case 2:
            percent = +price / 100 * 15;
            newPrice = price - percent;
            await Product.updateOne({_id: id}, {$set: {price: newPrice}});
            res.status(200).json({message: 'Скидка 15%'});
            break;
        case 3:
            percent = +price / 10;
            newPrice = price - percent;
            await Product.updateOne({_id: id}, {$set: {price: newPrice}});
            res.status(200).json({message: 'Скидка 10%'});
            break;
        default:
            res.status(200).json({message: 'Скидки нет'});
    }
}

    module.exports = calculateDiscount;
