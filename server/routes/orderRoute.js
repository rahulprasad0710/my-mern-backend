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

    const totalPriceAll = await Promise.all(
        allOrderIds.map(async (orderItemOne) => {
            const orderItem = await OrderItem.findById(orderItemOne).populate(
                "book"
            );
            const totalMrpPrice = orderItem.book.mrpRate * orderItem.quantity;
            const totalPriceActual =
                orderItem.book.priceRate * orderItem.quantity;
            return { totalPriceActual, totalMrpPrice };
        })
    );

    const mrpPriceTotal = totalPriceAll.reduce(
        (a, b) => a + b.totalMrpPrice,
        0
    );
    const actualPriceTotal = totalPriceAll.reduce(
        (a, b) => a + b.totalPriceActual,
        0
    );

    console.log(" mrpPriceTotal", mrpPriceTotal);
    console.log("actualPriceTotal", actualPriceTotal);
    var newOrder = new Order({
        orderItems: allOrderIds,
        user: req.body.user,
        paymentMethod: req.body.paymentMethod,
        isPaid: req.body.isPaid,
        status: req.body.status,
        totalMRPPrice: mrpPriceTotal,
        totalActualPrice: actualPriceTotal,
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

//update a order for admin
router.put("/:id", async (req, res) => {
    const orderID = req.params.id;
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            orderID,
            {
                status: req.body.status,
                isPaid: req.body.isPaid,
            },
            {
                new: true,
            }
        );

        res.status(200).json(updateOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

//Delete  the order for admin and user
router.delete("/:id", async (req, res) => {
    const orderID = req.params.id;
    try {
        const deletedOrder = await Order.findByIdAndRemove(orderID);

        const deleteOrderItems = await deletedOrder.orderItems.map(
            async (oneOrderItem) => {
                await OrderItem.findByIdAndRemove(oneOrderItem);
            }
        );

        res.status(200).json(deletedOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

router.get("/admin/totalsales", async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: "$totalActualPrice" } } },
    ]);

    res.send({ tatalSales: totalSales.pop().totalsales });
});
module.exports = router;
