const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const port = 5000;

app.get("/hello", (req, res) => {
    res.send("Hello hello");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
