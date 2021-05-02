const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    mobileNo: {
        type: Number,
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
});

const User = mongoose.model("user", userSchema);

module.exports = User;
