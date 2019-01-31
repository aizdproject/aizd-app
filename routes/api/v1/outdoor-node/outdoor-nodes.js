const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const Outdoor = require("../../../../models/OutdoorModel/Outdoor");

const pusher = new Pusher({
  appId: "678390",
  key: "b01fb79d33e790f8c38d",
  secret: "d1f13cad97b92dd92a39",
  cluster: "ap1",
  encrypted: true
});

router.get("/", (req, res) => {
  Outdoor.find().then(outdoorData => res.json(outdoorData));
});

router.get("/:id", (req, res) => {
  Outdoor.findById(req.params.id).then(outdoorData => res.json(outdoorData));
});

router.post("/", (req, res) => {
  const newOutdoor = new Outdoor({
    name: req.body.name,
    soil_temperature: req.body.soil_temperature,
    soil_vwc: req.body.soil_vwc,
    soil_ec: req.body.soil_ec,
    soil_salinity: req.body.soil_salinity,
    soil_tds: req.body.soil_tds,
    soil_epsilon: req.body.soil_epsilon,
    climate_humidity: req.body.climate_humidity,
    climate_temperature: req.body.climate_temperature,
    climate_cda: req.body.climate_cda,
    climate_par: req.body.climate_par,
    created_at: moment().format("DD/MM/YYYY-H:mm:ss")
  });

  newOutdoor
    .save()
    .then(outdoor => {
      pusher.trigger("outdoor", "post-outdoor", {
        name: outdoor.name,
        soil_temperature: outdoor.soil_temperature,
        soil_vwc: outdoor.soil_vwc,
        soil_ec: outdoor.soil_ec,
        soil_salinity: outdoor.soil_salinity,
        soil_tds: outdoor.soil_tds,
        soil_epsilon: outdoor.soil_epsilon,
        climate_humidity: outdoor.climate_humidity,
        climate_temperature: outdoor.climate_temperature,
        climate_cda: outdoor.climate_cda,
        climate_par: outdoor.climate_par,
        created_at: outdoor.created_at
      });

      return res.status(201).json(outdoor);
    })
    .catch(err => {
      err.message;
    });
});

router.post("/:id", (req, res) => {
  Outdoor.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        soil_temperature: req.body.soil_temperature,
        soil_vwc: req.body.soil_vwc,
        soil_ec: req.body.soil_ec,
        soil_salinity: req.body.soil_salinity,
        soil_tds: req.body.soil_tds,
        soil_epsilon: req.body.soil_epsilon,
        climate_humidity: req.body.climate_humidity,
        climate_temperature: req.body.climate_temperature,
        climate_cda: req.body.climate_cda,
        climate_par: req.body.climate_par,
        created_at: moment().format("DD/MM/YYYY-H:mm:ss")
      }
    },
    { new: true }
  )
    .then(outdoor => {
      pusher.trigger("outdoor", "update-outdoor", {
        name: outdoor.name,
        soil_temperature: outdoor.soil_temperature,
        soil_vwc: outdoor.soil_vwc,
        soil_ec: outdoor.soil_ec,
        soil_salinity: outdoor.soil_salinity,
        soil_tds: outdoor.soil_tds,
        soil_epsilon: outdoor.soil_epsilon,
        climate_humidity: outdoor.climate_humidity,
        climate_temperature: outdoor.climate_temperature,
        climate_cda: outdoor.climate_cda,
        climate_par: outdoor.climate_par,
        created_at: outdoor.created_at
      });

      res.status(201).json(outdoor);
    })
    .catch(err =>
      res.status(404).json({
        message: err.message
      })
    );
});

router.delete("/:id", (req, res) => {
  Outdoor.findById(req.params.id)
    .then(outdoor =>
      outdoor.remove().then(() =>
        res.json({
          message: "Berhasil menghapus outdoor"
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        message: "Gagal menghapus outdoor",
        error: err.message
      })
    );
});

module.exports = router;
