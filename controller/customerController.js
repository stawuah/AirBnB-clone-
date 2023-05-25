
const User = require('../models/UserSchema') 
  
const getCustomers = async (req, res) => {
    const user =  await User.find()

    res.json({count: user.length , user})
}


module.exports = {getCustomers,}

// choose to change anything im this file , i persornally used it to get users or customers
