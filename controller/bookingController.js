const Booking = require('../model/BookingSchema');
const Property = require('../model/propertySchema')
const twilio = require('twilio')(process.env.SID, process.env.AUTH_TOKEN)
require('dotenv').config()

const bookProperty = async (req, res) => {


  try {
    // find the property by owner and title
    const property = await Property.findOne({ owner: req.body.owner, title: req.body.title });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // check if the property is available for the given dates
    const bookings = await Booking.find({ property: property._id });
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      if (req.body.checkIn < booking.checkOut && req.body.checkOut > booking.checkIn) {
        return res.status(400).json({ message: 'Property is not available for specific dates' });
      }
      break;
    }

    // create a booking for the user
    const booking = new Booking({
      user: req.user._id,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      property: property._id,
      guests: req.body.guests,
      totalPrice: req.body.totalPrice
    });

    // save the boking and update the property's availability
    await booking.save();
    property.available = false;
    await property.save();

    res.status(201).json({ booking, message: 'Thanks for booking this property' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }

  twilio.messages.create({
    from: 'twilio phone number',
    to: '<users phone number>',
    body: `Hello, you have just made your bookings live it !!`
  })
    .then((res) => console.log("Message has  been sent"))

};


const getAllBookedProperties = async (req, res) => {
  try {
    const allProperty = await Booking.find().populate({
      path: 'user',
      select: 'name , email'
    })
    res.json({ count: allProperty.length, allProperty }).status(200)

  } catch (e) {
    res.status(500).json({ message: 'Server error' });
    console.log(e)
  }
}



const updateBookedProperty = async (req, res) => {
  try {
    // Find the booking by ID
    const booking = await Booking.findByIdAndUpdate(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the booking properties
    if (req.body.checkIn) {
      booking.checkIn = req.body.checkIn;
    }
    if (req.body.checkOut) {
      booking.checkOut = req.body.checkOut;
    }
    if (req.body.guests) {
      booking.guests = req.body.guests;
    }
    if (req.body.totalPrice) {
      booking.totalPrice = req.body.totalPrice;
    }

    // Save the updated booking
    await booking.save();

    res.status(200).json({ booking, message: 'Booking updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  twilio.messages.create({
    from: 'twilio phone number',
    to: '<users phone number>',
    body: `Hello, you have just updated your bookings with AirBnB. live it!!`
  })
    .then((res) => console.log("Message has  been sent"))
};



const deleteBookedProperty = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)

    res.json('This booked property has been deleted succesfully').status(201)
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }

}



module.exports = {
  bookProperty,
  getAllBookedProperties,
  deleteBookedProperty,
  updateBookedProperty
}