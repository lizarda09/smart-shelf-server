const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (roles) => {
    return function (req, res, next){
        if (req.method === 'OPTIONS') {
            return next();
        }

        try {

            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({message: 'Нет авторизации'});
            }
            const {position: position} = jwt.verify(token, config.get('jwtSecret'));
            let hasRole = false;
            position.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true;
                }
            });
            if(!hasRole){
                return res.status(401).json({message: 'Нет доступа'});
            }
            next();

        } catch (e) {
            return res.status(401).json({message: 'Нет авторизации'});
        }
    }
}