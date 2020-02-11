const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'qwerty123asd')
    req.admin = decoded
    
    next()
  } catch (error) {
    res.status(401).send('Auth Failed')
  }
}