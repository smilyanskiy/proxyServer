require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");
const api = require("./api");

const app = express();

const PORT = 4001;
const HOST = "localhost";

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", api);

app.use(
  cors({
    origin: process.env.API_SERVICE_URL,
    credentials: true,
  })
);

app.use(
  createProxyMiddleware(process.env.API_SERVICE_URL, {
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(
      async (responseBuffer, proxyRes, req, res) => {
        if (/text\/html/.test(proxyRes.headers["content-type"])) {
          const response = responseBuffer.toString("utf8");
          const replaceScripts = response.replace(
            /\/\/old.favorit.com.ua/g,
            "http://localhost:4001"
          );
          return replaceScripts;
        }
        return responseBuffer;
      }
    ),
  })
);

app.get("/", (req, res) => {
  res.send();
});

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
