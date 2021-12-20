const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: String,
  password: {
    type: String,
    minlength: 6,
    required: true,
    select: false,
  },
})
module.exports = mongoose.model('User', UserSchema)
