const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const AirNodeSchema = new Schema({
  name: {
    type: String
  },
  air_temperature: [
    {
      type: Number
    }
  ],
  air_humidity: [
    {
      type: Number
    }
  ],
  air_quality: [
    {
      type: Number
    }
  ],
  light_intensity: [
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

module.exports = AirNode = mongoose.model("AirNode", AirNodeSchema);
