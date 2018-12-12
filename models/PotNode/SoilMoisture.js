const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const SoilMoistureSchema = new Schema({
    moisture1: {
        type: Number,
        required: true,
    },
    moisture2: {
        type: Number,
        required: true,
    },
    moisture3: {
        type: Number,
        required: true,
    },
    moisture4: {
        type: Number,
        required: true,
    }
});

module.exports = SoilMoisture = mongoose.model('SoilMoisture', SoilMoistureSchema);