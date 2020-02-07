const express = require('express')
const router = express.Router()

const { Event } = require('../models/event')

router.post('/', async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      name: req.body.name,
      venue: req.body.venue,
      place: req.body.place,
      details: req.body.details,
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

router.patch('/cancel/:eventId', async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { "_id": req.params.eventId },
      { "cancelled": true },
      { new: true })

      res.status(200).send(updatedEvent)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.delete('/:eventId', async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.eventId })
      .then(result => {
        res.status(200).send('Event removed')
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router