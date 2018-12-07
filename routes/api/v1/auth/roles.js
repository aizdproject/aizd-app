const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const Role = require('../../../../models/Auth/Role');

router.get('/', (req, res) => {
    Role.find()
        .then(roles => res.json(roles));
});

router.get('/:id', (req, res) => {
    Role.findById(req.params.id)
        .then(role => res.json(role));
});

router.post('/', (req, res) => {
    const newRole = new Role({
        name: req.body.name
    });

    newRole.save().then(role => res.json(role));
})

router.delete('/:id', (req, res) => {
    Role.findById(req.params.id)
        .then(role => role.remove()
            .then(() => res.json({
                message: 'Berhasil menghapus role'
            })))
        .catch(err => res.status(404).json({
            message: 'Gagal menghapus role',
            error: err.message
        }))
})

module.exports = router;