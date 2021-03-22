const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();
const auth = require('../middleware/auth.middleware');
const {Types} = require('mongoose');

router.get('/users', auth, async function (req, res){
    try {
        const users = await User.find({});
        res.status(200).json({users});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.get('/getUserById', auth, async function (req, res){
    try {
        const id = req.body.id;
        const user = await User.findOne({_id: id});
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({message: 'Пользователь не найден...'});
    }
});

router.get('/getUserByPosition', auth, async function (req, res){
    try {
        const position = req.body.position;
        const user = await User.find({position: position})
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({message: 'Пользователь с такой ролью не найден...'});
    }
});

router.get('/getUserByEmail', auth, async function (req, res){
    try {
        const email = req.body.email;
        const user = await User.find({email: email});
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({message: 'Пользователь с такой почтой не найден...'});
    }
});

module.exports = router;