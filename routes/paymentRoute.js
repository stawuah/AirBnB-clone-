const express = require('express')
const router = express.Router()

const { protectJwt } = require('../middleware/authMiddleware');
const { StartPaymentInit, StartPaymentInitToken } = require('../controller/paymentController')

router.post('/create_link_token', protectJwt, StartPaymentInitToken,)
router.post('/create_link_token_for_payment', StartPaymentInit)

module.exports = router
