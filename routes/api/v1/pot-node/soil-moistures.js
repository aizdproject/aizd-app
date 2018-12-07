//5bf3879ed887671f008c3195

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const Moisture = require('../../../../models/PotNode/SoilMoisture');
const PotNode = require('../../../../models/PotNode/PotNode');

router.get('/', (req, res) => {
    Moisture.find()
        .sort({
            date: -1
        })
        .then(moistures => res.json(moistures));
});

router.get('/:id', (req, res) => {
    Moisture.findById(req.params.id)
        .then(moisture => res.json(moisture));
});

router.post('/', (req, res) => {
    const newMoisture = new Moisture({
        moisture1: req.body.moisture1,
        moisture2: req.body.moisture2,
        moisture3: req.body.moisture3,
        moisture4: req.body.moisture4,
    });

    newMoisture.save().then(moisture => res.json(moisture));

    PotNode.findById(req.body.pot_node_id)
        .then(potNode => {
            potNode.soil_moistures.push(newMoisture);
            potNode.save();
        });
})

router.delete('/:id', (req, res) => {
    Moisture.findById(req.params.id)
        .then(moisture => moisture.remove()
            .then(() => res.json({
                success: true
            })))
        .catch(err => res.status(404).json({
            success: false
        }))
})

module.exports = router;