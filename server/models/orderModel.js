const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    products: {
        type: String,
        require: true,
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "user",
    },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
