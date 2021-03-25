const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    count: {type: Number, required: true},
    purchaseDate: {type: Date, required: true}
});

module.exports = model('Sale', schema);