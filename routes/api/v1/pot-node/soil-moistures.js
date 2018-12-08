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

router.delete('/:id', (req, res) => {
    Moisture.findById(req.params.id)
        .then(moisture => moisture.remove()
            .then(() => res.json({
                success: true
            })))
        .catch(err => res.status(404).json({
            success: false
        }))
});

module.exports = router;