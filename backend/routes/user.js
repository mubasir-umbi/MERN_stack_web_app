const express = require('express')
const { registerUser, authUser, updateUserProfile } = require('../controller/user')
const {protect}  = require("../middlewares/auth")

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').post(protect, updateUserProfile)


module.exports = router;