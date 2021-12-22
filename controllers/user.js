const User = require('../model/User')
const asyncHanlder = require('../middleware/async')

// get all users
// GET
exports.getUsers = asyncHanlder(async (req, res) => {
  // fetch from db
  const users = await User.find()
  res.status(200).json({ success: true, data: users })
})

// get user by id
exports.getUser = asyncHanlder(async (req, res) => {
  // fetch from db
  const user = await User.findOne(req.params.id)
  res.status(200).json({ success: true, data: user })
})

// create/register

exports.CreateUser = asyncHanlder(async (req, res) => {
  // error handling
  if (!req.body) {
    res.status(500).json({
      success: false,
      message: 'Incorrect data',
    })
  }
  const user = await User.create(req.body)
  res.status(201).json({
    success: true,
    data: user,
  })
})

// update user
exports.updateUser = asyncHanlder(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: user,
  })
})

// delete
exports.deleteUser = asyncHanlder(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success: true,
    data: {},
  })
})
