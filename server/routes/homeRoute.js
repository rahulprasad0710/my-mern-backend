const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Book = require("../models/bookModel");
const querystring = require("querystring");
const url = require("url");
router.get("/", async (req, res) => {
    try {
        const newbooks = await Book.find().sort({ createdAt: 1 }).limit(3);
        // console.log("newBook", newbooks);
        res.status(200).json({ newbooks });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});
router.get("/onebook", async (req, res) => {
    const bookID = req.query.bookid;
    try {
        const onebook = await Book.findById(bookID);
        res.status(200).json(onebook);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
