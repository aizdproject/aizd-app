const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const AlphaSchema = new Schema({
    name: {
        type: String,
    },
    soil_temperature: [{
        type: Number,
    }],
    soil_vwc: [{
        type: Number,
    }],
    soil_ec: [{
        type: Number,
    }],
    soil_salinity: [{
        type: Number,
    }],
    soil_tds: [{
        type: Number,
    }],
    soil_epsilon: [{
        type: Number,
    }],
    air_temperature: [{
        type: Number,
    }],
    air_humidity: [{
        type: Number,
    }],
    air_gas_quality: [{
        type: Number,
    }],
    created_at: [{
        type: String
    }]
});

module.exports = Alpha = mongoose.model('Alpha', AlphaSchema);