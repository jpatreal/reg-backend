const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const eventSchema = new mongoose.Schema({
  title: {
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
    type: Date,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  registrants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }]
})

eventSchema.plugin(mongoosePaginate)
const Event = mongoose.model('Event', eventSchema)

exports.Event = Event