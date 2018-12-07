const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const User = require('../../../../models/Auth/User');

router.get('/', (req, res) => {
    User.find()
        .populate('roles')
        .then(users => res.json(users));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .populate('roles')
        .then(user => res.json(user));
});

router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        address: req.body.address,
    });

    newUser.save().then(user => res.json(user));
})

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then(() => res.json({
                message: 'Berhasil menghapus User'
            })))
        .catch(err => res.status(404).json({
            message: 'Gagal menghapus User',
            error: err.message
        }))
})

module.exports = router;