const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Missing token'});
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decoded = jwt.verify(token, 'THIS_IS_SECRET_BUT_WE_ARE_NOT_GOING_TO_PROD');
        req.user = decoded.id;
        
        next();
    } catch (e) {
        res.status(401).json({message: 'Token is not valid'});
    }
};

module.exports = auth;
