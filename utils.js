const fetch = require("node-fetch");

const postData = (url = "/", data = {}) =>
  fetch(process.env.API_SERVICE_URL + url, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prepareData(data)),
  }).then((result) => result.json());

const prepareData = (data) => {
  const { params, method } = data;
  return {
    jsonrpc: "2.0",
    id: Date.now(),
    method,
    params: {
      by: params,
    },
  };
};

module.exports = { postData };
