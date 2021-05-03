const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");

//Routes
const registerRoute = require("./routes/registerRoute");
const orderRoute = require("./routes/orderRoute");
const loginRoute = require("./routes/loginRoute");
// Middeleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

dotenv.config();
const PORT = process.env.PORTID || 5000;

//Routes
app.use("/order", orderRoute);
app.use("/account", registerRoute);
app.use("/account", loginRoute);

app.get("/", (req, res) => {
    res.send("main index is Working");
});

mongoose.connect(
    process.env.MDB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.error(err);
        console.log("connect to MongoDb");
    }
);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
