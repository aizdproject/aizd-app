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
    humidity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Humidity'
    }],
    temperature: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temperature'
    }],
    light_intensity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LightIntensity'
    }],
    air_quality: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AirQuality'
    }],
});

module.exports = GreenHouseNode = mongoose.model('GreenHouseNode', GreenHouseNodeSchema);