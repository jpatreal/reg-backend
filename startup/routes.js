const users = require('../routes/users')
const events = require('../routes/events')

module.exports = function(app) {
  app.use('/api/users/', users)
  app.use('/api/events/', events)
}