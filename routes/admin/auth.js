const express = require('express')
const router = express.Router()
const adminAuth = require('../../middleware/admin-auth')

const { Admin } = require('../../models/admin')

router.post('/create-admin', adminAuth, async (req, res) => {
  try {
    await Admin.findOne({ userName: req.body.userName })
      .then(user => {
        if (user) {
          res.status(401).send('Username already taken!')
        } else {
          const admin = new Admin({
            userName: req.body.userName,
            password: req.body.password
          })
          admin.save()
          res.status(200).send({ admin })
        }
      })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post('/admin-login', async (req, res) => {
  try {
    let admin = await Admin.findByCredentials(req.body.userName, req.body.password)
    const token = await admin.generateAuthToken()

    res.status(200).send({ admin, token })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/me', adminAuth, async (req, res) => {
  try {
    let admin = await Admin.findOne({ _id: req.admin._id })
    res.status(200).send({ admin })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router