const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
//const helmet = require('helmet')
const connectDB = require('./config/db');
//const cors = require('cors')
const colors = require("colors")
const app = express()
const port = 8080
const { StartPaymentInit, StartPaymentInitToken, Info } = require('./controller/paymentController')

const { protectJwt } = require('./middleware/authMiddleware');
//connectDB()

//app.use(cors())
//app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/create/', require('./routes/bookedRoute'))
app.use('/api/properties', require('./routes/propertyRoute'))
app.use('/api/properties/bookproperty/users', require('./routes/bookedRoute'))//get all booked property
app.use('/api/properties/bookproperty', require('./routes/bookedRoute'))// post , get ,update delete = property
app.use('/api/reservation', require('./routes/reservationRoute'))
app.use('/api/auth', require('./routes/authRoute')) // login , register, = user


app.post('/api', require('./routes/paymentRoute'))
app.use('/api/', require('./routes/paymentRoute'))
app.get('/api/info', Info)

app.listen(port, () => {
    console.log(`server runing ${port} `);
})