const mongoose = require('mongoose')

const PropertySchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please add a your title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Add price']
    },
    address: {
        type: String,
        required: [true, 'Add address']
    },
    city: {
        type: String,
        required: [true, 'Please add a city']
    },
    state: {
        type: String,
        required: [true, 'Please add a state']
    },
    country: {
        type: String,
        required: [true, 'Please add a country']
    },
    zipcode: {
        type: String,
        required: [true, 'Please add zip-code']
    },
    state: {
        type: String,
        required: [true, 'Please add a state']
    },
    image: {
        public_id: {
            type: [String]
        },
        url: {
            type: [String]
        }
    },
    available: { type: Boolean, required: true, default: true },
    date: {
        type: Date,
        default: Date.now
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

})
module.exports = mongoose.model('Property', PropertySchema)