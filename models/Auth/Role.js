const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = Role = mongoose.model('Role', RoleSchema);