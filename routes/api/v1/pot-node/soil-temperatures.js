//5bf3879ed887671f008c3195

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const Temperature = require('../../../../models/PotNode/SoilTemperature');
const PotNode = require('../../../../models/PotNode/PotNode');

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

router.delete('/:id', (req, res) => {
    Temperature.findById(req.params.id)
        .then(temperature => temperature.remove()
            .then(() => res.json({
                success: true
            })))
        .catch(err => res.status(404).json({
            success: false
        }))
});

module.exports = router;