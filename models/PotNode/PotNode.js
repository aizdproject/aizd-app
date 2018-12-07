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
    soil_temperatures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SoilTemperature'
    }],
    soil_moistures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SoilMoisture'
    }],
});

module.exports = PotNode = mongoose.model('PotNode', PotNodeSchema);