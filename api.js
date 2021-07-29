const router = require("express").Router();
const { postData } = require("./utils");

router.get("/*", (req, res, next) => {
  res.status(405).send("Not allowed");
});

router.post("/event", function (req, res) {
  const { eventID } = req.body;
  return postData("/frontend_api2/", {
    params: {
      lang: "en",
      service_id: 0,
      head_markets: false,
      event_id: Number(eventID),
    },
    method: "frontend/event/get",
  }).then((data) => res.status(200).json(data));
});

module.exports = router;
