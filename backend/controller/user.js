const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const genarateToken = require('../utils/genarateToken')

const registerUser = asyncHandler(
    async (req, res) => {
        const {name, email, password, pic} = req.body

        const userExist = await User.findOne({email})

        if(userExist){
            res.status(400)
            throw new Error("User Alredy Exists")
        }

        const user = await User.create({
            name,
            email,
            password,
            pic
        })

        if(user){
            res.status(201).json({
                _id : user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: genarateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error('Error occured!')
        }


    
        res.json({
            name, 
            email
        })
    }
)


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email})
    
    if(user.isBlock){
        res.status(403)
        throw new Error('Sorry..! You are blocked!')
      }


    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            block: user.isBlock,
            token: genarateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Email or Password!')
    }

})


const updateUserProfile = asyncHandler(async (req, res) => {
   try {
    const user = await User.findById(req.user._id)
    console.log(user, 'usrreeeeeeeeeeeeeeeeeeeeeee');
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;

        if( req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            token: genarateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error("User not found!")
    }
   } catch (error) {
    console.log(error);
   }
})

module.exports = { registerUser, authUser, updateUserProfile }