const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('No token, authorization denied');
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.id;
        
        next();
    } catch (e) {
        res.status(400).send('Token is not valid');
    }
};

module.exports = auth;
