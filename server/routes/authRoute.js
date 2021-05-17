const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const existingUserInfo = req.authUser;
    try {
        res.status(200).json({ existingUserInfo });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
