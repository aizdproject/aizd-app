const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const moment = require("moment-timezone");
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const PotNode = require("../../../../models/PotNode/PotNode");
const Temperature = require("../../../../models/PotNode/SoilTemperature");
const Moisture = require("../../../../models/PotNode/SoilMoisture");

router.get("/", (req, res) => {
  PotNode.find()
    .populate("soil_temperatures")
    .populate("soil_moistures")
    .then(potNodes => res.status(200).json(potNodes))
    .catch(err =>
      res.status(404).json({
        message: err.message
      })
    );
});

router.get("/:id", (req, res) => {
  PotNode.findById(req.params.id)
    .populate("soil_temperatures")
    .populate("soil_moistures")
    .then(potNode => res.status(200).json(potNode))
    .catch(err =>
      res.status(404).json({
        message: err.message
      })
    );
});

router.post("/", (req, res) => {
  const newPotNode = new PotNode({
    name: req.body.name,
    address: req.body.address
  });

  newPotNode.save().then(potNode => res.status(201).json(potNode));
});

router.post("/data", (req, res) => {
  const newTemperature = new Temperature({
    temperature1: req.body.temperature1,
    temperature2: req.body.temperature2,
    temperature3: req.body.temperature3,
    temperature4: req.body.temperature4
  });
  newTemperature.save();

  const newMoisture = new Moisture({
    moisture1: req.body.moisture1,
    moisture2: req.body.moisture2,
    moisture3: req.body.moisture3,
    moisture4: req.body.moisture4
  });
  newMoisture.save();

  id = req.body.pot_node_id;

  PotNode.findByIdAndUpdate(
    req.body.pot_node_id,
    {
      $push: {
        soil_temperatures: newTemperature,
        soil_moistures: newMoisture,
        created_at: moment().format("DD/MM/YYYY-H:mm:ss")
      }
    },
    { new: true }
  )
    .populate("soil_temperatures")
    .populate("soil_moistures")
    .then(potNode =>
      res.status(201).json({
        newTemperature,
        newMoisture,
        id,
        potNode
      })
    )
    .catch(err =>
      res.status(404).json({
        message: err.message
      })
    );
});

router.delete("/:id", (req, res) => {
  PotNode.findById(req.params.id)
    .then(potNode =>
      potNode.remove().then(() =>
        res.status(200).json({
          message: "Berhasil menghapus Pot"
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        message: "Gagal menghapus Pot",
        error: err.message
      })
    );
});

module.exports = router;
