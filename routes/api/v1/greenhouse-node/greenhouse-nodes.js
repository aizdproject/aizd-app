const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const GreenHouseNode = require('../../../../models/GreenHouseNode/GreenHouseNode');
const Humidity = require('../../../../models/GreenHouseNode/Humidity');
const Temperature = require('../../../../models/GreenHouseNode/Temperature');
const LightIntensity = require('../../../../models/GreenHouseNode/LightIntensity');
const AirQuality = require('../../../../models/GreenHouseNode/AirQuality');

router.get('/', (req, res) => {
    GreenHouseNode.find()
        .populate('humidities')
        .populate('temperatures')
        .populate('light_intensities')
        .populate('air_qualities')
        .then(greenHouseNodes => res.json(greenHouseNodes));
});

router.get('/:id', (req, res) => {
    GreenHouseNode.findById(req.params.id)
        .populate('humidities')
        .populate('temperatures')
        .populate('light_intensities')
        .populate('air_qualities')
        .then(greenHouseNode => res.json(greenHouseNode));
});

router.post('/', (req, res) => {
    const newGreenHouseNode = new GreenHouseNode({
        name: req.body.name,
        address: req.body.address,
    });

    newGreenHouseNode.save().then(greenHouseNode => res.json(greenHouseNode));
})

router.post('/data', (req, res) => {
    const newHumidity = new Humidity({
        humidity1: req.body.humidity1,
        humidity2: req.body.humidity2,
        humidity3: req.body.humidity3,
        humidity4: req.body.humidity4,
        humidity5: req.body.humidity5,
        humidity6: req.body.humidity6,
    });
    newHumidity.save();

    const newTemperature = new Temperature({
        temperature1: req.body.temperature1,
        temperature2: req.body.temperature2,
        temperature3: req.body.temperature3,
        temperature4: req.body.temperature4,
        temperature5: req.body.temperature5,
        temperature6: req.body.temperature6,
    });
    newTemperature.save();

    const newLightIntensity = new LightIntensity({
        light_intensity1: req.body.light_intensity1,
        light_intensity2: req.body.light_intensity2,
        light_intensity3: req.body.light_intensity3,
        light_intensity4: req.body.light_intensity4,
        light_intensity5: req.body.light_intensity5,
        light_intensity6: req.body.light_intensity6,
    });
    newLightIntensity.save();

    const newAirQuality = new AirQuality({
        air_quality1: req.body.air_quality1,
        air_quality2: req.body.air_quality2,
        air_quality3: req.body.air_quality3,
        air_quality4: req.body.air_quality4,
        air_quality5: req.body.air_quality5,
        air_quality6: req.body.air_quality6,
    });
    newAirQuality.save();

    GreenHouseNode.findByIdAndUpdate(req.body.greenhouse_node_id, {
            $push: {
                humidities: newHumidity,
                temperatures: newTemperature,
                light_intensities: newLightIntensity,
                air_qualities: newAirQuality
            }
        })
        .populate('humidities')
        .populate('temperatures')
        .populate('light_intensities')
        .populate('air_qualities')
        .then(greenHouseNode => res.status(201).json({
            greenHouseNode
        }))
        .catch(err => res.status(404).json({
            message: 'Gagal menambahkan data sensor',
            error: err.message
        }))
});

router.delete('/:id', (req, res) => {
    GreenHouseNode.findById(req.params.id)
        .then(greenHouseNode => greenHouseNode.remove()
            .then(() => res.json({
                message: 'Berhasil menghapus pompa'
            })))
        .catch(err => res.status(404).json({
            message: 'Gagal menghapus pompa',
            error: err.message
        }))
})

module.exports = router;