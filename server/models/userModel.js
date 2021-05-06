const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },

        mobileNo: {
            type: String,
            require: true,
            unique: true,
        },

        level: {
            type: String,
        },

        passwordHash: {
            type: String,
            require: true,
        },

        regEmail: {
            type: String,
        },

        addresses: [
            {
                address: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Address",
                },
            },
        ],
        bookmarks: [
            {
                books: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
