const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const { populate } = require("../models/orderModel");

//get all order
router.get("/", async (req, res) => {
    try {
        const oneOrder = await Order.find()
            .populate("user")
            .sort({ updatedAt: -1 });
        res.status(200).json(oneOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

//get one specific order
router.get("/:id", async (req, res) => {
    const orderID = req.params.id;
    try {
        const oneOrder = await Order.findById(orderID)
            .populate("user")
            .populate({ path: "orderItems", populate: "book" });

        res.status(200).json(oneOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

//place order post request
router.post("/", async (req, res) => {
    const orderItemsId = Promise.all(
        req.body.orderItems.map(async (orderItemOne) => {
            let newOrderItem = new OrderItem({
                book: orderItemOne.book,
                quantity: orderItemOne.quantity,
            });

            let savedOrderItems = await newOrderItem.save();
            return savedOrderItems._id;
        })
    );

    const allOrderIds = await orderItemsId;
    var newOrder = new Order({
        orderItems: allOrderIds,
        user: req.body.user,
        PaymentMethod: req.body.paymentMethod,
        isPaid: req.body.isPaid,
    });

    try {
        const savedOrder = await newOrder.save();
        console.log(savedOrder);
        res.status(201).send({ msg: " order placed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});
module.exports = router;
