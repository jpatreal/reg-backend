const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, 'qwerty123asd')
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).send('Auth Failed')
  }
}