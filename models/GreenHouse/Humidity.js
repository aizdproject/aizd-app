const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const HumiditySchema = new Schema({
    humidity1: {
        type: Number,
        required: true,
    },
    humidity2: {
        type: Number,
        required: true,
    },
    humidity3: {
        type: Number,
        required: true,
    },
    humidity4: {
        type: Number,
        required: true,
    },
    humidity5: {
        type: Number,
        required: true,
    },
    humidity6: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Humidity = mongoose.model('Humidity', HumiditySchema);