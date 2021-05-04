const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Book = require("../models/bookModel");
const { cloudinary } = require("../utils/cloudinary");

router.post("/upload", async (req, res) => {
    try {
        const { imgData, values } = req.body;
        console.log(values);
        if (!imgData) {
            return res.status(400).json({ errorMsg: "Image not found" });
        }

        try {
            var uploadResponse = await cloudinary.uploader.upload(imgData, {
                upload_preset: "bookitem",
            });
        } catch (error) {
            console.log(error);
            res.status(400).send("Error in Image upload");
        }

        const newBook = new Book({
            ...values,
            image: uploadResponse.url,
        });
        try {
            const savedBook = await newBook.save();
            console.log("savedBook:-", savedBook);
        } catch (error) {
            console.error("DB_erroR:", error);
            res.status(400).send("Error in saving the book ,try again");
        }
        res.status(200).json({ okMsg: "New Book is created" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
