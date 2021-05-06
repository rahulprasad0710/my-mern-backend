const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var morgan = require("morgan");
// Middeleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));
//Routes
const authRoute = require("./routes/authRoute.js");
const registerRoute = require("./routes/registerRoute");
const orderRoute = require("./routes/orderRoute");
const loginRoute = require("./routes/loginRoute");
const profileRoute = require("./routes/profileRoute");
const adminRoute = require("./routes/adminRoute.js");
const homeRoute = require("./routes/homeRoute.js");

dotenv.config();
const PORT = process.env.PORTID || 5000;

//Routes
app.use("/auth", authRoute);
app.use("/order", orderRoute);
app.use("/account", registerRoute);
app.use("/account", loginRoute);
app.use("/profile", profileRoute);
app.use("/admin", adminRoute);
app.use("/home", homeRoute);

app.get("/", (req, res) => {
    res.send("main index is Working");
});

mongoose.connect(
    process.env.MDB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) return console.error(err);
        console.log("connect to MongoDb");
    }
);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
