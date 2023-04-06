const express = require("express")
const router = express.Router();
const User = require("../models/Users")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchuser")

const JWT_SECRET = "krishnaiseverything"


//Route 1
//Create a user using POST,   "/api/auth/createuser"  Doesn't require login
router.post("/createuser",[body("name", "Enter a valid name").isLength(3),body("email", "Enter a valid email").isEmail(),body("password", "Enter a valid password").isLength(5)],  async (req, res)=>{
let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,  errors: errors.array() });
    }
   

try {

    let user = await User.findOne({email:req.body.email})

    if(user){
        return res.status(522).json({success,  error:"user already exist"})
        console.log
    }

    else{
       

        const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password, salt);


//Create a user
let user = await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass
})

const data ={

    user:{
        id:user.id
    }
}

const authToken = jwt.sign(data, JWT_SECRET);
success = true
res.json({success, authToken})

user.save()
    }
    
} catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured")

}    
})



//Route 2 
//Authenticate a user using POST,   "/api/auth/login"  Doesn't require login

router.post("/login",[body("email", "Enter a valid email").isEmail(),body("password", "Enter a valid password").isLength(5)],  async (req, res)=>{
success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }


    const {email, password} = req.body
    try {
let user = await User.findOne({email})

if(!user){

   return res.status(500).json({success,error: "Please login with correct credentials"})
}

const passwordCompare = await bcrypt.compare(password, user.password)     

if(!passwordCompare){
   return res.status(500).json(success, {success, error: "Please login with correct credentials"})

}
const data ={

    user:{
        id:user.id
    }
}

let authToken = jwt.sign(data, JWT_SECRET);
success = true
res.json({success, authToken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    
    }})



    //Route 3 
//Get user details using POST,   "/api/auth/getuser"   require login

router.post("/getuser",fetchUser,  async (req, res)=>{



    try {

         userId = req.user.id

        let user = await User.findById(userId).select("-password")
res.send(user)       



        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    
    }
})
module.exports = router