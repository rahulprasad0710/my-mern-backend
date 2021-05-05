const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Address = require("../models/addressModel");
const User = require("../models/userModel");

//my-info

router.get("/myinfo", async (req, res) => {
    try {
        const tokenID = req.cookies.tokenID;
        if (!tokenID) res.status(202).json("cookie not found");
        console.log(tokenID);
        const verifiedToken = jwt.verify(tokenID, process.env.JWT_SECRET);
        console.log(verifiedToken);

        const existingUserInfo = await User.findOne(
            { _id: verifiedToken.user },
            (error, userInfo) => {
                try {
                    if (error) console.log(error);
                    console.log("User Info", userInfo);
                    return userInfo;
                } catch (error) {
                    throw error;
                }
            }
        );

        res.status(200).json(existingUserInfo);
    } catch (error) {
        res.status(400);
    }
});

router.post("/myaddress", async (req, res) => {
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

//  const tokenID = req.cookies.tokenID;
//         if (!tokenID) res.status(202).json("cookie not found");
//         const verifiedToken = jwt.verify(tokenID, process.env.JWT_SECRET);

//         console.log(verifiedToken);

// const existingUserMobile = await User.findOne(
//     { _id: verifiedToken.user },
//     (err, mobileNo) => {
//         try {
//             console.log("mobileNo", existingUserMobile);
//             return email;
//         } catch (error) {
//             throw error;
//         }
//     }
// );
