const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const Alpha = require('../../../../models/AlphaModel/Alpha');

router.get('/', (req, res) => {
    Alpha.find()
        .then(alphaData => res.json(alphaData));
});

router.get('/:id', (req, res) => {
    Alpha.findById(req.params.id)
        .then(alphaData => res.json(alphaData));
});

router.post('/', (req, res) => {
    const newAlpha = new Alpha({
        name: req.body.name,
        soil_temperature: req.body.soil_temperature,
        soil_vwc: req.body.soil_vwc,
        soil_ec: req.body.soil_ec,
        soil_salinity: req.body.soil_salinity,
        soil_tds: req.body.soil_tds,
        soil_epsilon: req.body.soil_epsilon,
        air_humidity: req.body.air_humidity,
        air_temperature: req.body.air_temperature,
        air_gas_quality: req.body.air_gas_quality,
        created_at: moment().format('DD/MM/YYYY-H:mm:ss')
    });

    newAlpha.save().then(alpha => {
        res.status(201).json(alpha)
    })
    .catch(err => {
        err.message
    });
})

router.post('/:id', (req, res) => {
    Alpha.findByIdAndUpdate(req.params.id, {
            $push: {
                soil_temperature: req.body.soil_temperature,
                soil_vwc: req.body.soil_vwc,
                soil_ec: req.body.soil_ec,
                soil_salinity: req.body.soil_salinity,
                soil_tds: req.body.soil_tds,
                soil_epsilon: req.body.soil_epsilon,
                air_humidity: req.body.air_humidity,
                air_temperature: req.body.air_temperature,
                air_gas_quality: req.body.air_gas_quality,
                created_at: moment().format('DD/MM/YYYY-H:mm:ss')
            }
        }, { new: true })
        .then(alphaData => res.status(201).json({
            alphaData
        }))
        .catch(err => res.status(404).json({
            message: err.message
        }))
})

router.delete('/:id', (req, res) => {
    Alpha.findById(req.params.id)
        .then(alpha => alpha.remove()
            .then(() => res.json({
                message: 'Berhasil menghapus alpha'
            })))
        .catch(err => res.status(404).json({
            message: 'Gagal menghapus alpha',
            error: err.message
        }))
})

module.exports = router;