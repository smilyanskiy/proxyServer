const router = require("express").Router();
const { postData } = require("./utils");

router.get("/event", (req, res, next) => {
  console.log(res);
  res.status(200).send();
});

router.post("/event", function (req, res) {
  const { eventID } = req.body;
  postData(process.env.API_SERVICE_URL + "/frontend_api2/", {
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
