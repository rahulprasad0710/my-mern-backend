const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
    {
        addressUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
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

module.exports = Address;
