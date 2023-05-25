const express = require('express')
const router = express.Router()

const {
    registerCustomer,
    login,
    updateCustomer,
    resetPassword,
    forgotPassword,
    logout
} = require('../controller/authControllers');

router.post('/logout', logout);

router.post('/reset-password', resetPassword)

router.post('/forgot-password', forgotPassword);

router.post('/register', registerCustomer)

router.post('/login', login)

router.put('/:id', updateCustomer)


module.exports = router;
