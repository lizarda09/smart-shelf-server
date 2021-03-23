const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    count: {type: Number},
    discount: {type: Number, min: 0, max: 100, default: 0},
    dateOfManufacture: {type: String, required: true},
    dateOfReceiving: {type: Date, required: true},
    shelfLife: {type: Number}
});

module.exports = model('Product', schema);