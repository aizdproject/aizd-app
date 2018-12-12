const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const PompNode = require('../../../../models/PompNode/PompNode');

router.get('/', (req, res) => {
    PompNode.find()
        .then(pompNodes => res.json(pompNodes));
});

router.get('/:id', (req, res) => {
    PompNode.findById(req.params.id)
        .then(pompNode => res.json(pompNode));
});

router.post('/', (req, res) => {
    const newPompNode = new PompNode({
        name: req.body.name,
        address: req.body.address,
    });

    newPompNode.save().then(pompNode => res.json(pompNode));
})

router.post('/data', (req, res) => {
    PompNode.findByIdAndUpdate(req.body.pomp_node_id, {
            $push: {
                water_turbidity: req.body.turbidity,
                water_ph: req.body.ph,
                water_flow: req.body.flow,
                created_at: moment().format('DD/MM/YYYY-H:mm:ss')
            }
        })
        .then(pompNode => res.status(201).json({
            pompNode
        }))
        .catch(err => res.status(404).json({
            message: 'Gagal menambahkan data sensor'
        }))
});

router.delete('/:id', (req, res) => {
    PompNode.findById(req.params.id)
        .then(pompNode => pompNode.remove()
            .then(() => res.json({
                message: 'Berhasil menghapus pompa'
            })))
        .catch(err => res.status(404).json({
            message: 'Gagal menghapus pompa',
            error: err.message
        }))
})

module.exports = router;