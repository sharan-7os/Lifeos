const bcrypt = require('bcryptjs');
const User=require('../models/User');

const register=async(req,res)=>{
    try{
        const{name,email,password} = req.body;
        const UserExists=await User.findOne({email});
        if(UserExists){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,email,password:hashedPassword
        });
        res.status(201).json({message:"User Registered Successfully"});
    }
    catch(error){
        res.status(500).json({message:error.messaage});
    }
};