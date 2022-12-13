const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    let authToken = req.headers && req.headers.authorization;
    authToken = authToken.split(' ');
    var decoded = jwt.verify(authToken[1], process.env.SECRET_KEY);
    res.tokenId = decoded.id;
    next()
}

module.exports = authToken;