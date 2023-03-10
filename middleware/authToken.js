const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
  let authToken = req.headers && req.headers.authorization;
  if (authToken) {
      authToken = authToken.split(' ');
      try {
          var decoded = jwt.verify(authToken[1], process.env.SECRET_KEY);
          res.tokenId = decoded.id;
          res.tokenRole = decoded.role;
          res.tokenCompany = decoded.company;
        } catch(err) {
          if(err.name == 'TokenExpiredError'){
              res.status(500).json({ message: 'Token has expired', err: 'TokenExpiredError' })
          }
        }
  } else {
    res.status(500).json({ message: 'No token given', err: 'NoTokenError'})
  }
  next()
}

module.exports = authToken;