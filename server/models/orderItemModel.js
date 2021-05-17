const mongoose = require("mongoose");
const orderItemSchema = mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
    },
    quantity: {
        type: Number,
        require: true,
    },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
