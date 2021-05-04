const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        publication: {
            type: String,
        },
        level: {
            type: String,
        },
        subject: {
            type: String,
        },
        author: {
            type: String,
        },
        edition: {
            type: String,
            require: true,
        },
        mrpRate: {
            type: Number,
            require: true,
        },
        priceRate: {
            type: Number,
            require: true,
        },
        quantityInStock: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
