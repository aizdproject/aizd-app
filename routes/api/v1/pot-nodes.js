const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

//Item model
const Item = require('../../../models/PotNode');

//@route    GET api/items
//@desc     Get All Items
//access    public
router.get('/', (req, res) => {
    Item.find()
        .sort({
            date: -1
        })
        .then(items => res.json(items));
});

//@route    GET api/items
//@desc     Get an Item
//access    public
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item));
});

//@route    POST api/items
//@desc     Post new Item
//access    public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        address: req.body.address,
        air_quality: req.body.air_quality,
        air_turbidity: req.body.air_turbidity,
        soil_moisture: req.body.soil_moisture,
        soil_temperature: req.body.soil_temperature,
    });


    newItem.save().then(item => res.json(item));
})

//@route    DELETE api/items
//@desc     Delete an item
//access    public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({
                success: true
            })))
        .catch(err => res.status(404).json({
            success: false
        }))
})

module.exports = router;