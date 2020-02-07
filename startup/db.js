const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function () {
  const option = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    keepAlive: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 30000
  }

  mongoose.connect('mongodb+srv://event-reg:qwerty123456@firstcluster-xiuty.mongodb.net/eventReg?retryWrites=true&w=majority', option)
    .then(() => {
      console.log('Connected to MongoDB | Server is up and running.')
    })
    .catch(error => {
      console.log(error)
    })
}