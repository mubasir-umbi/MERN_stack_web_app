const express = require('express')
const {getUsers, getUserById, authAdmin} = require('../controller/admin')
const { route } = require('./user')
const {protect}  = require("../middlewares/auth")


const router = express.Router()

router.route('/').post(authAdmin)
router.route('/dashboard').get(protect, getUsers)
router.route('/block/:id').get(protect, getUserById)
//.put().delete()


module.exports = router;