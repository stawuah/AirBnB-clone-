
const crypto = require('crypto')

const generateToken = () => {
    const token = {
        value: crypto.randomBytes(12).toString('hex'),
        expiration: Date.now() + 1 * 60 * 1000 // 1 minute in milliseconds
    };
    console.log('token' , token)

    return token 
}

module.exports = generateToken
