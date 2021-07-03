const {Schema, model} = require('mongoose');

const user = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    phone: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    position: [{type: String, ref: 'Role'}]
});

module.exports = model('User', user);