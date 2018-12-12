const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const TemperatureSchema = new Schema({
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
    },
    temperature5: {
        type: Number,
        required: true,
    },
    temperature6: {
        type: Number,
        required: true,
    }
});

module.exports = Temperature = mongoose.model('Temperature', TemperatureSchema);