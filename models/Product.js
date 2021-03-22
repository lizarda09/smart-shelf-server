const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    count: {type: Number},
    dateOfReceiving: {type: String, required: true},
    timeOfReceiving: {type: String, required: true},
    shelfLife: {type: Number}
});

module.exports = model('Product', schema);