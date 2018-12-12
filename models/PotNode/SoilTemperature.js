const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const SoilTemperatureSchema = new Schema({
    temperature1: {
        type: Number,
        required: true,
    },
    temperature2: {
        type: Number,
        required: true,
    },
    temperature3: {
        type: Number,
        required: true,
    },
    temperature4: {
        type: Number,
        required: true,
    }
});

module.exports = SoilTemperature = mongoose.model('SoilTemperature', SoilTemperatureSchema);