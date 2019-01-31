const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OutdoorSchema = new Schema({
  name: {
    type: String
  },
  climate_temperature: [
    {
      type: Number
    }
  ],
  climate_humidity: [
    {
      type: Number
    }
  ],
  climate_cda: [
    {
      type: Number
    }
  ],
  climate_par: [
    {
      type: Number
    }
  ],
  soil_temperature: [
    {
      type: Number
    }
  ],
  soil_vwc: [
    {
      type: Number
    }
  ],
  soil_ec: [
    {
      type: Number
    }
  ],
  soil_salinity: [
    {
      type: Number
    }
  ],
  soil_tds: [
    {
      type: Number
    }
  ],
  soil_epsilon: [
    {
      type: Number
    }
  ],
  created_at: [
    {
      type: String
    }
  ]
});

module.exports = Outdoor = mongoose.model("Outdoor", OutdoorSchema);
