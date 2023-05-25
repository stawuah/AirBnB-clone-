
// const Payment = require('../models/payment');
// const Property = require('../models/propertySchema')
// const Reservation = require('../models/reservationSchema')
// require('dotenv')
// const paystack = require("paystack-api")("secret_key");

// const initializePayment = async (req, res) => {
//   try {
//     const { email, amount, callback_url } = req.body;


    
//     const reference = `ref-${Math.ceil(Math.random() * 10e13)}`;

//     const params = JSON.stringify({
//       email,
//       amount,
//       reference,
//       callback_url,
//     });

//     const options = {
//       hostname: 'api.paystack.co',
//       port: 443,
//       path: '/transaction/initialize',
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     };

//     const req = https.request(options, (response) => {
//       let data = '';

//       response.on('data', (chunk) => {
//         data += chunk;
//       });

//       response.on('end', async () => {
//         const paymentResponse = JSON.parse(data);
//         const authorizationUrl = paymentResponse.data.authorization_url;

//         // Save the payment details to the database
//         const payment = new Payment({
//           reference,
//           email,
//           amount,
//           authorization_url: authorizationUrl,
//         });
//         await payment.save();

//         res.status(200).json({ authorizationUrl });
//       });
//     }).on('error', (error) => {
//       console.error(error);
//       res.status(500).json({ message: 'An error occurred while initializing payment' });
//     });

//     req.write(params);
//     req.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while initializing payment' });
//   }
// };

// module.exports = {initializePayment}


// // we finding property and owner 
// const property = await Property.findOne({ owner: req.body.owner, title: req.body.title });
//   if (!property) {
//     return res.status(404).json({ message: 'Property not found' });
// } 


//   // check if the property is available for the given dates
// const reservations = await Reservation.find({ property: property._id });
//   for (let i = 0; i < reservations.length; i++) {
//     const reservation = reservations[i];
//       if (req.body.checkIn < reservation.checkOut && req.body.checkOut > reservation.checkIn) {
//         return res.status(400).json({ message: 'Property is not available for specific dates' });
//       }
//     break;
//   }





// const response = await paystack.transaction.initialize({ amount: 100000, email:Reservation.user.email});
 
// const data = response.data; 
// await data.save()
// console.log(data);
// // Here is response from Paystack API.