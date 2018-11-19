const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const PotNodeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    air_quality: {
        type: Number,
        required: true
    },
    air_turbidity: {
        type: Number,
        required: true
    },
    soil_moisture: {
        type: Number,
        required: true
    },
    soil_temperature: {
        type: Number,
        required: true
    },
});

module.exports = PotNode = mongoose.model('pot-nodes', PotNodeSchema);