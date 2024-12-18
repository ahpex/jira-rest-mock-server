import express from "express";
import https from "https";
import fs from "fs";
import searchRoute from "./routes/search";
import issueRoute from "./routes/issue";
import browseRoute from "./routes/browse";
import info from "./routes/info";
import process from "process";

const app = express();
const SSL_PORT = process.env.SSL_PORT || 6443;

// SSL certificate and key
const sslOptions = {
    key: fs.readFileSync(__dirname + "/ssl/private.key"),
    cert: fs.readFileSync(__dirname + "/ssl/certificate.crt"),
};

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use("/", info);
app.use("/browse", browseRoute);
app.use("/rest/api/v2/search", searchRoute);
app.use("/rest/api/v2/issue", issueRoute);

// Start HTTPS server
https.createServer(sslOptions, app).listen(SSL_PORT, () => {
    console.log(`HTTPS server is running on https://127.0.0.1:${SSL_PORT}`);
});
