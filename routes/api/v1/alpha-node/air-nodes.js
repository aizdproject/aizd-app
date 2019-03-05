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

const AirNode = require("../../../../models/AlphaModel/AirNode");

const pusher = new Pusher({
  appId: "678390",
  key: "b01fb79d33e790f8c38d",
  secret: "d1f13cad97b92dd92a39",
  cluster: "ap1",
  encrypted: true
});

router.get("/", (req, res) => {
  AirNode.find().then(airnodeData => res.json(airnodeData));
});

router.get("/:id", (req, res) => {
  AirNode.findById(req.params.id).then(airnodeData => res.json(airnodeData));
});

router.post("/", (req, res) => {
  const newAirNode = new AirNode({
    name: req.body.name,
    air_humidity: req.body.air_humidity,
    air_temperature: req.body.air_temperature,
    air_gas_quality: req.body.air_gas_quality,
    light_intensity: req.body.light_intensity,
    created_at: moment().format("DD/MM/YYYY-H:mm:ss")
  });

  newAirNode
    .save()
    .then(airnode => {
      pusher.trigger("airnode", "post-airnode", {
        name: airnode.name,
        air_humidity: airnode.air_humidity,
        air_temperature: airnode.air_temperature,
        air_gas_quality: airnode.air_gas_quality,
        light_intensity: airnode.light_intensity,
        created_at: airnode.created_at
      });

      return res.status(201).json(airnode);
    })
    .catch(err => {
      err.message;
    });
});

router.post("/:id", (req, res) => {
  AirNode.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        air_humidity: req.body.air_humidity,
        air_temperature: req.body.air_temperature,
        air_gas_quality: req.body.air_gas_quality,
        light_intensity: req.body.light_intensity,
        created_at: moment().format("DD/MM/YYYY-H:mm:ss")
      }
    },
    { new: true }
  )
    .then(airnode => {
      pusher.trigger("airnode", "update-airnode", {
        name: airnode.name,
        air_humidity: airnode.air_humidity,
        air_temperature: airnode.air_temperature,
        air_gas_quality: airnode.air_gas_quality,
        light_intensity: airnode.light_intensity,
        created_at: airnode.created_at
      });

      res.status(201).json(airnode);
    })
    .catch(err =>
      res.status(404).json({
        message: err.message
      })
    );
});

router.delete("/:id", (req, res) => {
  AirNode.findById(req.params.id)
    .then(airnode =>
      airnode.remove().then(() =>
        res.json({
          message: "Berhasil menghapus airnode"
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        message: "Gagal menghapus airnode",
        error: err.message
      })
    );
});

module.exports = router;
