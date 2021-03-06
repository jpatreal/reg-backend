const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const { User } = require('../models/user')
const { Event } = require('../models/event')

router.post('/signup', async (req, res) => {
  try {
    await User.findOne({ email: req.body.email })
      .then(async user => {
        if (user) {
          return res.status(400).send('Email already taken!')
        } else {
          const client = new User(req.body.user)
          await client.save()
          res.status(201).send({ client })
        }
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    let user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.status(200).send({user, token})
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id })
    res.status(200).send({ user })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/my-events', auth, async (req, res) => {
  try {
    const events = await User.findOne({ _id: req.user._id })
      .populate('events', '-registrants -__v')

      res.status(200).send(events)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/registered', auth, async (req, res) => {
  try {
    let event = await Event.findOne({ _id: req.body.eventId })
    for (let i = 0; i < event.registrants.length; i++) {
      if (event.registrants[i] == req.user._id) {
        
        res.send(true)
      }
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

router.patch('/register-event', auth, async (req, res) => {
  try {
    const userId = req.user._id
    const eventId = req.body.eventId

    let user = await User.findByIdAndUpdate(
      { "_id": userId },
      { $push: { "events": eventId } },
      { new: true })

    let event = await Event.findByIdAndUpdate(
      { "_id": eventId },
      { $push: { "registrants": userId } },
      { new: true })  

    res.status(200).send({ user, event })  
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.patch('/unregister-event', auth, async (req, res) => {
  try {
    const userId = req.user._id
    const eventId = req.body.eventId

    let user = await User.findByIdAndUpdate(
      { "_id": userId },
      { $pull: { "events": eventId } },
      { new: true })

    let event = await Event.findByIdAndUpdate(
      { "_id": eventId },
      { $pull: { "registrants": userId } },
      { new: true })  

    res.status(200).send({ user, event })  
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router
