
const express = require('express')
const router =  express.Router()

const {protectJwt} = require('../middleware/authMiddleware');

const {getPropertyRatings,addRatingToProperty} = require('../controller/ratingsController')

router
.post('/addingrating', protectJwt,addRatingToProperty)
.get('/getpropertyratings' , protectJwt,  getPropertyRatings)

module.exports = router