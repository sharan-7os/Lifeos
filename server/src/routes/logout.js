const logout = (req,res)=>{

    res.clearCookie("token");

    res.json({
        message:"Logged Out"
    });
};