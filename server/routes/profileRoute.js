const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Address = require("../models/addressModel");
const User = require("../models/userModel");
router.post("/profile", async (req, res) => {
    try {
        const { addressName, ward, tole, city, district } = req.body;

        if (!addressName || !ward || !tole || !city || !district) {
            return res
                .status(400)
                .json({ errorMsg: "please enter all the fields" });
        }

        const id = "60904eb4824f3259f866fb54";
        const newAddress = new Address({
            addressUser: id,
            addressName,
            ward,
            tole,
            city,
            district,
        });

        const addsaved = await User.findByIdAndUpdate(id, {
            addresses: [{ newAddress }],
        });

        const addedAddress = User.populated(addresses);
        console.log(addedAddress);

        res.status(200).json({ okMsg: "your address is saved" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
