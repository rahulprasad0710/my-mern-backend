const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

//Routes
const auth = require("./routes/adduser");
const order = require("./routes/orderRoute");

// Middeleware
app.use(cors({ credentials: true }));
app.use(express.json());

dotenv.config();
const PORT = process.env.PORTID || 5000;

app.use("/order", order);
app.use("/account", auth);

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

//set up routes

// app.use("/auth", require("./routes/userRouter"));
// app.use("/", require("./routes/addProductRouter"));
// app.use("/", require("./routes/customerRouter"));
// app.use("/", require("./routes/test"));

// Connect to server
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
