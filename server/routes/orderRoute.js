const express = require("express");
const router = express.Router();

const Order = require("../models/orderModel");

router.post("/id", async (req, res) => {
    try {
        const { products, customer } = req.body;

        const newOrder = Order({
            products,
            customer,
        });
        try {
            const savedOrder = await newOrder.save();
            // console.log("savedOrder:-", savedOrder);

            const user = await savedOrder.populate("customer").execPopulate();
            console.log("user", user);
            res.status(200).json({ okMsg: " order placed 2" });
        } catch (error) {
            console.error("DB_erroR:", error);
            res.status(400).send("Error");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});
module.exports = router;
