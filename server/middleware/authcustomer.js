const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authCustomer = async (req, res, next) => {
    try {
        const tokenID = req.cookies.tokenID;

        if (!tokenID) res.status(202).json("cookie not found");
        const verifiedToken = jwt.verify(tokenID, process.env.JWT_SECRET);

        // console.log("verifiedToken", verifiedToken);
        const existingUser = await User.findById(verifiedToken.user)
            .select("-passwordHash")
            .populate("Book");

        // console.log("authMiddle", existingUser);

        req.authUser = existingUser;

        next();
    } catch (error) {
        res.status(500);
    }
};
module.exports = authCustomer;
