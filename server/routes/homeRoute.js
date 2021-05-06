const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Book = require("../models/bookModel");

router.get("/", async (req, res) => {
    try {
        const newbooks = await Book.find().sort({ createdAt: 1 }).limit(3);
        console.log("newBook", newbooks);
        res.status(200).json({ newbooks });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
