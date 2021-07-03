const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    products: [{type: Types.ObjectId, ref: 'Product'}]
});

module.exports = model('Shelf', schema);