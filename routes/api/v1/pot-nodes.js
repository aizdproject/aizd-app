const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const PotNode = require('../../../models/PotNode');

router.get('/', (req, res) => {
    PotNode.find()
        .populate('soil_temperatures')
        .populate('soil_moistures')
        .then(potNodes => res.json(potNodes));
});

router.get('/:id', (req, res) => {
    PotNode.findById(req.params.id)
        .populate('soil_temperatures')
        .populate('soil_moistures')
        .then(potNode => res.json(potNode));
});

router.post('/', (req, res) => {
    const newPotNode = new PotNode({
        name: req.body.name,
        address: req.body.address,
    });

    newPotNode.save().then(potNode => res.json(potNode));
})

router.delete('/:id', (req, res) => {
    PotNode.findById(req.params.id)
        .then(potNode => potNode.remove()
            .then(() => res.json({
                message: 'Berhasil menghapus Pot'
            })))
        .catch(err => res.status(404).json({
            message: 'Gagal menghapus Pot',
            error: err.message
        }))
})

module.exports = router;