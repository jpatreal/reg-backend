const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function () {
  const option = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    keepAlive: true,
    socketTimeoutMS: 30000,
    reconnectTries: 30000
  }

  mongoose.connect('', option) // Insert MongoDB SRV String here
    .then(() => {
      console.log('Connected to MongoDB | Server is up and running.')
    })
    .catch(error => {
      console.log(error)
    })
}