require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

try {
    const httpsoptions = {
        key: fs.readFileSync(`${process.env.SSL_PATH}/private.key`),
        cert: fs.readFileSync(`${process.env.SSL_PATH}/certificate.crt`),
        ca: fs.readFileSync(`${process.env.SSL_PATH}/ca.crt`),
    };
    https.createServer(httpsoptions, app).listen(port, () => {
        console.log(`ATS App Server Listening at ${port}`);
    });
} catch (err) {
    console.log("Error in Loding Certificates for ATS: ", err);
    app.listen(port, () => {
        console.log("ATS Production Server is running on port ", port);
    });
}
