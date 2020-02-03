const tests = require('../routes/tests')

module.exports = function(app) {
  app.use('/api/tests/', tests)
}