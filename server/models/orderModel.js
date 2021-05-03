const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user",
        },
        booksItems: [
            {
                name: { type: String, require: true },
                quantity: { type: Number, require: true },
                image: { type: String, require: true },
                price: { type: Number, require: true },
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    require: true,
                    ref: "Book",
                },
            },
        ],

        paymentMethod: {
            type: String,
            require: true,
        },

        isPaid: {
            type: Boolean,
            require: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: String,
        },

        taxPrice: {
            type: Number,
            require: true,
        },
        devileryCharge: {
            type: Number,
        },
        discount: {
            type: Number,
        },
        totalPriceWithoutTax: {
            type: Number,
            require: true,
        },
        totalPriceWithTax: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
