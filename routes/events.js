const express = require('express')
const router = express.Router()
const adminAuth = require('../middleware/admin-auth')

const { Event } = require('../models/event')

router.post('/', adminAuth, async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      venue: req.body.venue,
      place: req.body.place,
      details: req.body.details,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      date: req.body.date
    })

    event.save()
    res.status(200).send(event)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/all', async (req, res) => {
  try {
    Event.find()
      .then(result => {
        res.status(200).send(result)
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.patch('/cancel', adminAuth, async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { "_id": req.body.eventId },
      { "cancelled": true },
      { new: true })

      res.status(200).send(updatedEvent)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/remove/:eventId', adminAuth, async (req, res) => {
  try {
    await Event.findOneAndDelete({ _id: req.params.eventId })
    res.status(200).send('removed')
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router