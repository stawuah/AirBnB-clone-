

// const mongoose = require('mongoose');

// const PaymentSchema = new mongoose.Schema({
//   reference: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   authorization_url: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     default: 'pending',
//   },
//   reservation: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Reservation',
//     required: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('Payment', PaymentSchema);