const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/contact", (req, res) => {
    const contactData = req.body;

    fs.appendFile(
        "contacts.txt",
        `Name: ${contactData.name}\nEmail: ${contactData.email}\nMessage: ${contactData.message}\n-----------------\n`,
        (err) => {
            if (err) {
                return res.status(500).send("Error Saving Message");
            }
            res.send("Message Saved Successfully");
        }
    );
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});