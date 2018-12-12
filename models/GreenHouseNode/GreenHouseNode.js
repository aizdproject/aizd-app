const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const GreenHouseNodeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    humidities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Humidity'
    }],
    temperatures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temperature'
    }],
    light_intensities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LightIntensity'
    }],
    air_qualities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AirQuality'
    }],
    created_at: [{
        type: String
    }]
});

module.exports = GreenHouseNode = mongoose.model('GreenHouseNode', GreenHouseNodeSchema);