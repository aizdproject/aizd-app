const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
router.use(bodyParser.urlencoded({
    extended: false
}));

const PotNode = require('../../../../models/PotNode/PotNode');
const PompNode = require('../../../../models/PompNode/PompNode');
const GreenHouseNode = require('../../../../models/GreenHouseNode/GreenHouseNode');

router.get('/soil-temperature', (req, res) => {
    PotNode.find()
        .populate('soil_temperatures')
        .sort({
            created_at: -1
        })
        .then(potNodes => {
            if (potNodes.length > 0) {
                let lastUpdatedNode = potNodes[0];

                let soil_temperatures = lastUpdatedNode.soil_temperatures;

                res.status(200).json(soil_temperatures[soil_temperatures.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

router.get('/soil-moisture', (req, res) => {
    PotNode.find()
        .populate('soil_moistures')
        .sort({
            created_at: -1
        })
        .then(potNodes => {
            if (potNodes.length > 0) {
                let lastUpdatedNode = potNodes[0];

                let soil_moistures = lastUpdatedNode.soil_moistures;

                res.status(200).json(soil_moistures[soil_moistures.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

router.get('/water-turbidity', (req, res) => {
    PompNode.find()
        .populate('water_turbidity')
        .sort({
            created_at: -1
        })
        .then(pompNodes => {
            if (pompNodes.length > 0) {
                let lastUpdatedNode = pompNodes[0];

                let water_turbidity = lastUpdatedNode.water_turbidity;

                res.status(200).json(water_turbidity[water_turbidity.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

router.get('/water-ph', (req, res) => {
    PompNode.find()
        .populate('water_ph')
        .sort({
            created_at: -1
        })
        .then(pompNodes => {
            if (pompNodes.length > 0) {
                let lastUpdatedNode = pompNodes[0];

                let water_ph = lastUpdatedNode.water_ph;

                res.status(200).json(water_ph[water_ph.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

router.get('/water-flow', (req, res) => {
    PompNode.find()
        .populate('water_flow')
        .sort({
            created_at: -1
        })
        .then(pompNodes => {
            if (pompNodes.length > 0) {
                let lastUpdatedNode = pompNodes[0];

                let water_flow = lastUpdatedNode.water_flow;

                res.status(200).json(water_flow[water_flow.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

router.get('/environment-humidity', (req, res) => {
    GreenHouseNode.find()
        .populate('humidities')
        .sort({
            created_at: -1
        })
        .then(greenHouseNodes => {
            if (greenHouseNodes.length > 0) {
                let lastUpdatedNode = greenHouseNodes[0];

                let humidities = lastUpdatedNode.humidities;

                res.status(200).json(humidities[humidities.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

router.get('/environment-temperature', (req, res) => {
    GreenHouseNode.find()
        .populate('temperatures')
        .sort({
            created_at: -1
        })
        .then(greenHouseNodes => {
            if (greenHouseNodes.length > 0) {
                let lastUpdatedNode = greenHouseNodes[0];

                let temperatures = lastUpdatedNode.temperatures;

                res.status(200).json(temperatures[temperatures.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

router.get('/air-quality', (req, res) => {
    GreenHouseNode.find()
        .populate('air_qualities')
        .sort({
            created_at: -1
        })
        .then(greenHouseNodes => {
            if (greenHouseNodes.length > 0) {
                let lastUpdatedNode = greenHouseNodes[0];

                let air_qualities = lastUpdatedNode.air_qualities;

                res.status(200).json(air_qualities[air_qualities.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

router.get('/light-intensity', (req, res) => {
    GreenHouseNode.find()
        .populate('light_intensities')
        .sort({
            created_at: -1
        })
        .then(greenHouseNodes => {
            if (greenHouseNodes.length > 0) {
                let lastUpdatedNode = greenHouseNodes[0];

                let light_intensities = lastUpdatedNode.light_intensities;

                res.status(200).json(light_intensities[light_intensities.length - 1])
            }

            res.status(404).json({
                message: 'Tidak ada record'
            });
        })
        .catch(err => res.status(404).json({
            message: err.message
        }))
});

module.exports = router;