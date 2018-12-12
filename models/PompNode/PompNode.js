const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const PompNodeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    water_turbidity: [{
        type: Number,
        required: true
    }],
    water_ph: [{
        type: Number,
        required: true
    }],
    water_flow: [{
        type: Number,
        required: true
    }],
    created_at: [{
        type: String
    }]
});

module.exports = PompNode = mongoose.model('PompNode', PompNodeSchema);