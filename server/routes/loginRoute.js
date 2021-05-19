const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

router.get("/logout", (req, res) => {
    res.status(200)
        .cookie("tokenID", "", {
            httpOnly: true,
            expires: new Date(0),
        })
        .json("logout sucessfully");
});

router.post("/login", async (req, res) => {
    try {
        const { password, mobileNo } = req.body;

        if (!mobileNo || !password) {
            return res
                .status(400)
                .json({ message: "please enter all the fields" });
        }
        //Checking if account with this email  exists or not

        const existingUser = await User.findOne({ mobileNo: mobileNo });
        console.log(existingUser);
        if (!existingUser) {
            return res.status(401).json({
                message: "THis Mobile Number is not registered",
            });
        }

        if (existingUser) {
            const passwordCheck = await bcrypt.compare(
                password,
                existingUser.passwordHash
            );
            if (!passwordCheck) {
                return res.status(400).json({
                    message: "Wrong Email or Password",
                });
            }
        }

        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        console.log(token);
        res.status(200)
            .cookie("tokenID", token, {
                httpOnly: true,
            })
            .json({ message: "you are logged in" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
