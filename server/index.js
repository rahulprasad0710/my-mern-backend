const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //to get data from post request from client side

const port = 5000;

app.get("/", (req, res) => {
    res.send("Hellos World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
