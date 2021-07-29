require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const api = require("./api");

const app = express();

const PORT = 4001;
const HOST = "localhost";

app.use(
  cors({
    origin: process.env.API_SERVICE_URL,
    methods: ["POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use("/", api);

app.use("", (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
});

app.use(
  "/frontend_api2",
  createProxyMiddleware({
    target: process.env.API_SERVICE_URL,
    changeOrigin: true,
    secure: false,
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
