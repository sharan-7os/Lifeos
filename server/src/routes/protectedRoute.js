const auth = require("../middleware/auth");

router.get(
    "/profile",
    auth,
    async(req,res)=>{

        const user = await User.findById(
            req.user.id
        ).select("-password");

        res.json(user);
    }
);