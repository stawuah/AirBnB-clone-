

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true , 'Dear customer please add a name'], 
    },
    email:{
        type: String,
        required: [true , 'Dear customer please add a name'], 
        unique: true,
        lowercase: true,
        trim: true, 
        match : [/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/, 'Please your email']
    },
    password:{
        type: String,
        required: [true , 'Dear customer please use your usual email password '], 
    },
    forgotPassword: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ForgotSchema'
    }
},)


module.exports = mongoose.model('User' , UserSchema)