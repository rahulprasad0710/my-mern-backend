const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        addressName: {
            type: String,
            require: true,
        },
        ward: {
            type: Number,
        },
        tole: {
            type: String,
        },
        city: {
            type: String,
        },
        district: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Address = mongoose.model("address", addressSchema);

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

        addresses: [addressSchema],
        bookmarks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
