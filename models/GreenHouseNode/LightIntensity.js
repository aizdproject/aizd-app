const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const LightIntensitySchema = new Schema({
    light_intensity1: {
        type: Number,
        required: true,
    },
    light_intensity2: {
        type: Number,
        required: true,
    },
    light_intensity3: {
        type: Number,
        required: true,
    },
    light_intensity4: {
        type: Number,
        required: true,
    },
    light_intensity5: {
        type: Number,
        required: true,
    },
    light_intensity6: {
        type: Number,
        required: true,
    }
});

module.exports = LightIntensity = mongoose.model('LightIntensity', LightIntensitySchema);