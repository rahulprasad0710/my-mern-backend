const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
router.get("/", async (req, res) => {
    try {
        const tokenID = req.cookies.tokenID;
        if (!tokenID) res.status(202).json("cookie not found");
        console.log(tokenID);
        const verifiedToken = jwt.verify(tokenID, process.env.JWT_SECRET);
        console.log(verifiedToken);

        const existingUserInfo = await User.findOne(
            { _id: verifiedToken.user },
            (error, userInfo) => {
                try {
                    if (error) console.log(error);
                    console.log("User Info", userInfo);
                    return userInfo;
                } catch (error) {
                    throw error;
                }
            }
        );

        res.status(200).json({ existingUserInfo });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
