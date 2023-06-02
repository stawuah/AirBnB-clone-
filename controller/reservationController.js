const Reservation = require('../model/reservationSchema');
const twilio = require('twilio')(process.env.SID, process.env.AUTH_TOKEN)
require('dotenv').config()



// Controller for creating a new reservation
const createReservation = async (req, res) => {
  try {
    const { user, property, checkIn, checkOut, guests, totalPrice } = req.body;

    // Create a new reservation object
    const reservation = new Reservation({
      user,
      property,
      checkIn,
      checkOut,
      guests,
      totalPrice
    });

    // Save the reservation to the database
    const savedReservation = await reservation.save();

    // Send Twilio message
    twilio.messages
      .create({
        from: '<users phone number>',
        to: '<<user Phone number{should follow type of country code format}>>',
        body: `Hello, you have just made your bookings live life !!`
      })
      .then(() => console.log("Message has been sent"));

    res.status(201).json(savedReservation); // Return the saved reservation
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};



const getAllreservedProperty = async (req, res) => {
  try {
    const property = await Reservation.find().populate({
      path: 'user',
      select: 'name , email'
    })
    res.json({ count: property.length, property }).status(200)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteResrvation = async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.id)
  res.json("this reserved property has been deleted").status(201)
}

module.exports = {
  createReservation,
  getAllreservedProperty,
  deleteResrvation
}