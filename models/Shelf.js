const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    products: [{type: Types.ObjectId, ref: 'Product'}]
});

module.exports = model('Shelf', schema);