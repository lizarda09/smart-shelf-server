const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Role = require('../models/Role');
const router = Router();

const generateAccessToken = (userId, position) => {
    const payload = {
        userId,
        position
    }
    return jwt.sign(payload, config.get('jwtSecret'),{ expiresIn: '1h'})
}

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина 6 символов').isLength({min:6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }
        const {firstName, secondName, phone, email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует!'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const userRole = await Role.findOne({value: 'SELLER'});
        const user = new User({firstName, secondName, phone, email, password: hashedPassword, position: [userRole.value]})
        await user.save();

        res.status(201).json({message: 'Пользователь создан!'});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'});
    }
});

router.post(
    '/login',
    [
        check('email', 'Введите нормальный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйде снова'})
            }

            const token = generateAccessToken(user._id, user.position)

            res.json({ token });

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так...'});
        }
});

module.exports = router;