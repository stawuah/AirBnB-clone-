

const express = require('express')
const router = express.Router()

const { protectJwt } = require('../middleware/authMiddleware');
const {
    createReservation,
    getAllreservedProperty,
    deleteResrvation
} = require('../controller/reservationController')


router.post('/reserved', protectJwt, createReservation)
router.get('/allreserverdproperty', protectJwt, getAllreservedProperty)
router.delete('/:id', protectJwt, deleteResrvation)

module.exports = router
