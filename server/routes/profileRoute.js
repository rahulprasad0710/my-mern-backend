const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Address = require("../models/addressModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");

//<------------------GET METHOD-------get usr bookmarks---------------------->
router.get("/bookmark", async (req, res) => {
    const existingUserInfo = req.authUser;

    try {
        const userBookmarkList = await User.findById(
            existingUserInfo._id
        ).populate("bookmarks");
        console.log(userBookmarkList);
        res.status(200).json(userBookmarkList);
    } catch (error) {
        console.log(error);
        res.status(400);
    }
});

// <--- POST Method-----------------user-profile-bookmark----------------------->
router.post("/bookmark", async (req, res) => {
    const existingUserInfo = req.authUser;
    const { book } = req.body;
    console.log("book", book);
    try {
        const upadtedBookmark = await User.findByIdAndUpdate(
            existingUserInfo._id,
            {
                $push: {
                    bookmarks: book,
                },
            }
        );

        console.log("upadtedBookmark", upadtedBookmark);

        res.status(200);
    } catch (error) {
        res.status(400);
    }
});
//<----------GET METHOD---------my-info------------------------------>
router.get("/myinfo", async (req, res) => {
    const existingUserInfo = req.authUser;
    try {
        res.status(200).json(existingUserInfo);
    } catch (error) {
        res.status(400);
    }
});

router.put("/myinfo", async (req, res) => {
    try {
        const { id, values } = req.body;
        const { firstName, lastName, email, level } = values;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                regEmail: email,
                firstName,
                lastName,
                level,
            },
            {
                new: true,
            }
        );

        console.log(updatedUser);

        res.status(200).json("from update");
    } catch (error) {
        res.status(400);
    }
});

//<------------------profile/myaddress------------>
router.get("/myaddress", async (req, res) => {
    const existingUserInfo = req.authUser;
    try {
        const userAddress = await User.findById(existingUserInfo._id).select(
            "addresses"
        );

        res.status(200).json(userAddress);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// <---------------User Order ---------------------->
router.get("/orderhistory", async (req, res) => {
    const existingUserInfo = req.authUser;

    const userOrderList = await Order.find({ user: existingUserInfo })
        .populate({ path: "orderItems", populate: "book" })
        .sort({ dateOrdered: -1 });

    res.status(200).send({ orderHistory: userOrderList });
});
// <---------------POST user profile address ---------------------->
router.post("/myaddress", async (req, res) => {
    const existingUserInfo = req.authUser;
    // console.log("userInfofromadd", existingUserInfo);
    try {
        const { addressName, ward, tole, city, district } = req.body;

        if (!addressName || !ward || !tole || !city || !district) {
            return res
                .status(400)
                .json({ message: "please enter all the fields" });
        }

        // const newAddress = new Address({
        //     addressName,
        //     ward,
        //     tole,
        //     city,
        //     district,
        // });

        const updatedAddressUser = await User.findByIdAndUpdate(
            existingUserInfo._id,
            {
                $push: {
                    addresses: {
                        addressName,
                        ward,
                        tole,
                        city,
                        district,
                    },
                },
            }
        );

        console.log("updatedAddressUser", updatedAddressUser);

        res.status(200).json({ message: "your address is saved" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
