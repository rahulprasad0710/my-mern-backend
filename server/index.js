const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;

app.get("/hello", (req, res) => {
    res.send("Hello hellos world");
});
app.post("/hello", (req, res) => {
    console.log(req.body);
    res.status(200).json({ msg: "dekha hai pehli baar" });
});

app.get("/", (req, res) => {
    res.send("Hellos World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
