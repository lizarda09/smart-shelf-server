const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    phone: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    position: {type: String}
    //links: [{type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('User', schema);