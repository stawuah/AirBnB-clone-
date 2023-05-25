const express = require('express')
const router =  express.Router()

const {protectJwt} = require('../middleware/authMiddleware')
const {
    bookProperty,
    getAllBookedProperties,
    deleteBookedProperty,
    updateBookedProperty
} = require('../controller/bookingController')


router.post('/' , protectJwt ,bookProperty)
router.get('/' , protectJwt , getAllBookedProperties)
router.delete('/deletebookedprop/:id' , protectJwt , deleteBookedProperty)
router.put('/updatebooking/:id' , protectJwt , updateBookedProperty)

module.exports = router ;