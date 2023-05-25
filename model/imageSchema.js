const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        data: {
            type: String, // Binary image data as a string
            required: true,
        },
        contentType: {
            type: String, // MIME type of the image
            required: true,
        },
    }
});

module.exports = mongoose.model('Image', imageSchema);



