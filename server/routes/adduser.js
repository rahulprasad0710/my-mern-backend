const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.post("/signin", async (req, res) => {
    try {
        const { email, password, mobileNo } = req.body;
        const newUser = new User({
            mobileNo: mobileNo,
            regEmail: email,
            passwordHash: password,
        });

        try {
            const savedUser = await newUser.save();
            console.log("savedUser:-", savedUser);
            res.status(200).json({ okMsg: " Your new account is created" });
        } catch (error) {
            console.error("DB_erroR:", error);
            res.status(400).send("Error");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;

//500 Internal Server Error is a very general HTTP status code
//hat means something has gone wrong on the web site's server
//but the server could not be more specific on what the exact problem is.
