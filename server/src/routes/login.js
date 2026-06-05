const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req,res) => {

    const { email,password } = req.body;

    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );

    res.cookie(
        "token",
        token,
        {
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        }
    );

    res.status(200).json({
        success:true,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });
};