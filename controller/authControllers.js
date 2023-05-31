const twilio = require('twilio')(process.env.SID, process.env.AUTH_TOKEN)
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const Image = require('../model/imageSchema')
const ForgotSchema = require('../model/resetSchema.js');
const generateToken = require('../utils/tokenGen');
const jwtSecretKey = process.env.JWT_SECRET;
const mime = require('mime-types');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});





// login customer
// Route    POST /api/user/login
// access public
const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email })


  const giveToken = jwt.sign({ id: user._id }, jwtSecretKey, {
    expiresIn: process.env.EXPIRES_IN
  })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ user, giveToken, })
  } else {
    res.status(400)
    throw new Error('Invalid Password or email !')
  }

  // twilio.messages.create({
  //   from: '+16206589313',
  //   to: '+233201487955',
  //   body: `Hello ${user.name} Thank you logging into your account with Hunt's .We're thrilled to have you on board! Before you can start using our services ${user.name}`
  // })
  //   .then((res) => console.log("Message has  been sent"))
}

// logout

const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).send({
    success: true,
    message: 'You have been logged out successfully!',
  });
};




// update user
const updateCustomer = async (req, res) => {

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(201).json(user)

  if (!user) {
    res.status(400).json({ message: 'cannot update !' })
  }

}
// Uploads an image file
const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // console.log(result);
    return result
  } catch (error) {
    console.error(error);
  }
};

// Register newcustomer
// Route    POST /api/customers
// access public
const registerCustomer = async (req, res) => {

  try {
    const { name, email, password, image } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const imageName = await uploadImage(image);
    console.log(imageName);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      image: {
        public_id: imageName.public_id,
        url: imageName.secure_url
      }
    })

    if (!newUser) {
      return res.status(400).json({ message: 'Please add required credentials.' });
    }


    const savedUser = await newUser.save()
    res.status(201).json({ 'savedUser': savedUser })

    twilio.messages.create({
      from: '+16206589313',
      to: '+2330201487955',
      body: `Hello ${newUser.name} Thank you for registering your account with AirBnB .We're thrilled to have you on board! Before you can start using our services, please confirm your account by signing in, you are welcome ${newUser.name}`
    })
      .then((res) => console.log("Message has  been sent"))

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" })

  }
}

// Forgot  password
// Route    POST /api/customers
// access public

const forgotPassword = async (req, res,) => {
  try {
    // getting email and name from client
    const { email, name } = req.body
    // check if name and email are in db(existing user)
    const check = await User.findOne({ email, name })
    if (check) {
      //console.log(check); 
    }
    // create a generate a token for the existing user if not invalid user
    const forgotUser = await new ForgotSchema({
      name,
      email: check._id,
      token: generateToken().value
    })
    twilio.messages.create({
      from: '<twilio number>',
      to: '<user Phone number{should follow type of country code format}>',
      body: `Hello ${forgotUser.name} we received a request to reset your password for your account.this is your reset token ${forgotUser.token}`
    })
      .then((res) => console.log("Message has  been sent"))

    // save existing user id and token in db
    const saveForgotCustomer = await forgotUser.save()
    //console.log("saveCustomer" ,saveForgotCustomer)
    res.status(201).json(saveForgotCustomer)
  } catch (error) {
    // catch error
    res.status(400).json({ "message": "Invalid User or Credentials" })
  }

  // // mail options
  // // Create transporter object
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: '***********',
  //     pass: '++++++++++',
  //   },
  // });

  // // Define mail options
  // const mailOptions = {
  //   from: 'AirBnB Clone',
  //   to: check.email,
  //   subject: 'Password Reset',
  //   html: `<p>Hello,<p>Here is your password reset token: <strong>${token}</strong></p>`,
  // };


  // try {
  //   // Send email using transporter and mailOptions
  //   const info = await transporter.sendMail(mailOptions);
  //   console.log('Message sent: %s', info.messageId);
  // } catch (error) {
  //   console.error('Error sending email:', error);
  // }
}


// reset password 
// access public
// route api/customers/resetPassword
const resetPassword = async (req, res) => {

  const { token, newPassword } = req.body;

  try {
    // Find the token in the database
    const forgotPassword = await ForgotSchema.findOne({ token });

    // Check if the token exists and is not expired
    if (!forgotPassword || forgotPassword.expired) {
      throw new Error('Invalid or expired password reset token.');
    }

    // Update the user's password
    const user = await User.findById(forgotPassword.email);
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword;
    await user.save();

    // Mark the token as used
    forgotPassword.used = true;
    await forgotPassword.save();

    res.status(200).json({ message: 'Kwasi well done for implementing Password reset (successful.)' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}






module.exports = {
  login,
  logout,
  resetPassword,
  updateCustomer,
  forgotPassword,
  registerCustomer
}
