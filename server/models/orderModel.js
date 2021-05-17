const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user",
        },
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "OrderItem",
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
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

// paidAt: {
//             type: Date,
//         },
//         isDelivered: {
//             type: String,
//         },

//         taxPrice: {
//             type: Number,
//             require: true,
//         },
//         devileryCharge: {
//             type: Number,
//         },
//         discount: {
//             type: Number,
//         },
//         totalPriceWithoutTax: {
//             type: Number,
//             require: true,
//         },
//         totalPriceWithTax: {
//             type: Number,
//             require: true,
//         },
