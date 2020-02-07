const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoosePaginate = require('mongoose-paginate')

const adminSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: true
  },
  userName: {
    type: String,
    required: true,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  }
})

adminSchema.methods.toJSON() = function () {
  const admin = this
  const adminObject = admin.toObject()
  delete adminObject.password

  return adminObject
}

adminSchema.methods.generateAuthToken = function () {
  const admin = this
  const token = jwt.sign({ _id: admin._id.toString() }, 'qwerty123asd')

  return token
}

adminSchema.statics.findByCredentials = async (userName, password) => {
  const admin = await Admin.findOne({ userName })
  if (!admin) throw new Error('Invalid Username')

  const isMatch = await bcrypt.compare(password, admin.password)
  if (!isMatch) throw new Error('Invalid Password')

  return admin
}

adminSchema.pre('save', async function (next) {
  const admin = this
  if (admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 10)
  }

  next()
})

const Admin = mongoose.model('Admin', adminSchema)

exports.Admin = Admin