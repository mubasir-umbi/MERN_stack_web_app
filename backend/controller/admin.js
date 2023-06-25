const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const router = require('../routes/user')
const genarateToken = require('../utils/genarateToken')




const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email})

    if(user && (await user.matchPassword(password)) && user.isAdmin){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: genarateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Email or Password!')
    }

})

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()

    res.json(users)
})



const getUserById = asyncHandler(async (req, res) => {
   try {
    const user = await User.findById(req.params.id);
  console.log('am inside .............');
    if (user) {
        console.log('am insidellllllllllll .............');
      // Update the block status
      user.isBlock = !user.isBlock;
      await user.save();
  
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
   } catch (error) {
     console.log(error);
   }
  });
  







module.exports = {getUsers, getUserById, authAdmin};