const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const auth = require('../middleware/auth.middleware');
const roleMid = require('../middleware/role.middleware');

router.get('/', roleMid(['ADMIN']), async function (req, res){
    try {
        const users = await User.find({});
        res.status(200).json({users});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.get('/getByPosition', roleMid(['ADMIN']), async function (req, res){
    try {
        const position = req.body.position;
        const user = await User.find({position})
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: 'Пользователь с такой ролью не найден...'});
    }
});

// router.get('/:email', roleMid(['ADMIN']), async function (req, res){
//     try {
//         const email = req.params.email;
//         const user = await User.find(email);
//         //const user = await User.findOne({_id: id});
//         res.status(200).json({user});
//     } catch (e) {
//         res.status(500).json({message: 'Пользователь с такой почтой не найден...'});
//     }
// });

router.get('/:id', roleMid(['ADMIN']), async function (req, res){
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        //const user = await User.findOne({_id: id});
        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({message: 'Пользователь не найден...'});
    }
});

router.delete('/:id', roleMid(['ADMIN']), async function (req, res){
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.status(201).json({message: 'Пользователь удален'});
    } catch (e) {
        res.status(500).json({message: 'Пользователь не найден...'});
    }
});

//make user admin

router.put('/:id', roleMid(['ADMIN']), async function (req, res){
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user.position.indexOf("ADMIN") === -1){
            await User.updateOne({_id: id}, { $set: {position: [...user.position, "ADMIN"]}});
            res.status(201).json(user);
        } else res.status(400).json({message: 'Этот пользователь уже является администратором!'});

    } catch (e) {
        res.status(500).json({message: 'Пользователь не найден...'});
    }
});

module.exports = router;