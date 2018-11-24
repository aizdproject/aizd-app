//5bf3879ed887671f008c3195

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const Temperature = require('../../../models/Temperature');
const PotNode = require('../../../models/PotNode');

router.get('/', (req, res) => {
    Temperature.find()
        .sort({
            date: -1
        })
        .then(temperatures => res.json(temperatures));
});

router.get('/:id', (req, res) => {
    Temperature.findById(req.params.id)
        .then(temperature => res.json(temperature));
});

router.post('/', (req, res) => {
    const newTemperature = new Temperature({
        temperature1: req.body.temperature1,
        temperature2: req.body.temperature2,
        temperature3: req.body.temperature3,
        temperature4: req.body.temperature4,
    });

    newTemperature.save().then(temperature => res.json(temperature));

    PotNode.findById(req.body.pot_node_id)
        .then(potNode => {
            console.log("lala");
            potNode.soil_temperatures.push(newTemperature);
            potNode.save();
        });
})

router.delete('/:id', (req, res) => {
    Temperature.findById(req.params.id)
        .then(temperature => temperature.remove()
            .then(() => res.json({
                success: true
            })))
        .catch(err => res.status(404).json({
            success: false
        }))
})

module.exports = router;