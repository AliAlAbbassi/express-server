const express = require('express')

const {
  CreateUser,
  deleteUser,
  getUsers,
  updateUser,
  getUser,
} = require('../controllers/user')
const router = express.Router({ mergeParams: true })

router.route('/').get(getUsers).post(CreateUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router
