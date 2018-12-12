const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const AirQualitySchema = new Schema({
    air_quality1: {
        type: Number,
        required: true,
    },
    air_quality2: {
        type: Number,
        required: true,
    },
    air_quality3: {
        type: Number,
        required: true,
    },
    air_quality4: {
        type: Number,
        required: true,
    },
    air_quality5: {
        type: Number,
        required: true,
    },
    air_quality6: {
        type: Number,
        required: true,
    }
});

module.exports = AirQuality = mongoose.model('AirQuality', AirQualitySchema);