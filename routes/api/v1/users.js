const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

//user model
const User = require('../../../models/User');
const Job = require('../../../models/Job');

//@route    GET api/users
//@desc     Get All users
//access    public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users));
});

//@route    GET api/users
//@desc     Get an user
//access    public
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user));
});

//@route    POST api/users
//@desc     Post new user
//access    public
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        address: req.body.address
    });

    newUser.save().then(user => res.json(user));
})

//@route    DELETE api/users
//@desc     Delete an user
//access    public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then(() => res.json({
                success: true
            })))
        .catch(err => res.status(404).json({
            success: false
        }))
})

module.exports = router;