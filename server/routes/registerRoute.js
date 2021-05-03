const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    try {
        const { email, password, mobileNo } = req.body;
        if (!email || !password) {
            return res
                .status(401)
                .json({ errorMsg: "please enter all the fields" });
        }
        if (password.length < 8) {
            return res.status(401).json({
                errorMsg: "Password should be of atleast 8 characters",
            });
        }

        // if (password !== passwordAgain) {
        //     return res.status(401).json({ errorMsg: "Passwords donot match" });
        // }

        //Checking if account with this email already exists

        const existingUser = await User.findOne({ mobileNo: mobileNo });
        if (existingUser) {
            return res.status(400).json({
                errorMsg: "An account with this mobile number already exists",
            });
        }

        // Hash the passwod using bcrypt
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            mobileNo: mobileNo,
            regEmail: email,
            passwordHash: hashPassword,
        });

        try {
            const savedUser = await newUser.save();
            console.log("savedUser:-", savedUser);
            const token = jwt.sign(
                {
                    user: savedUser._id,
                },
                process.env.JWT_SECRET
            );
            res.status(200)
                .cookie("tokenID", token, {
                    httpOnly: true,
                })
                .json({ okMsg: " Your new account is created" });
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
