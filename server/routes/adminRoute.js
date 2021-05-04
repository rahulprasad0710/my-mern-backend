const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { cloudinary } = require("../utils/cloudinary");
router.post("/upload", async (req, res) => {
    try {
        const { imgData } = req.body;
        if (!imgData) {
            return res.status(400).json({ errorMsg: "Image not found" });
        }
        const uploadResponse = await cloudinary.uploader.upload(imgData, {
            upload_preset: "bookitem",
        });
        console.log(uploadResponse);

        res.status(200).json({ okMsg: "Image is saved" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
