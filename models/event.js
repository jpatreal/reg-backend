const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  time: {
    type: String,
    required: true
  },
  registrants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }]
})

eventSchema.plugin(mongoosePaginate)
const Event = mongoose.model('Event', eventSchema)

exports.Event = Event