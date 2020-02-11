const users = require('../routes/users')
const events = require('../routes/events')


const adminAuth = require('../routes/admin/auth')

module.exports = function(app) {
  app.use('/api/users/', users)
  app.use('/api/events/', events)


  app.use('/api/admin/auth', adminAuth)
}