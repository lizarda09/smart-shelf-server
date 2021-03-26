const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const auth = require('../middleware/auth.middleware');

router.get('/', auth, async function (req, res){
    try {
        const users = await User.find({});
        res.status(200).json({users});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});


router.get('/getByPosition', auth, async function (req, res){
    try {
        const position = req.body.position;
        const user = await User.find({position})
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: 'Пользователь с такой ролью не найден...'});
    }
});

router.get('/getByEmail', auth, async function (req, res){
    try {
        const email = req.body.email;
        const user = await User.find({email: email});
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({message: 'Пользователь с такой почтой не найден...'});
    }
});

router.get('/:id', auth, async function (req, res){
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        //const user = await User.findOne({_id: id});
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({message: 'Пользователь не найден...'});
    }
});

module.exports = router;