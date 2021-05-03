const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        mobileNo: {
            type: String,
            require: true,
            unique: true,
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
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
