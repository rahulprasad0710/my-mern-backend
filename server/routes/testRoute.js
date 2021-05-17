const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Address = require("../models/addressModel");
const User = require("../models/userModel");

router.get("/address", async (req, res) => {
    try {
        const id = "609d00b211c21052b494d7cd";
        const existingAddress = await User.findById(id).populate("addresses");

        console.log("existingAddress", existingAddress);
        res.status(200).send("hello from test adddress");
    } catch (error) {
        res.status(400);
    }
});

module.exports = router;


