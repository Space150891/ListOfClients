const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const providerScheme = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
}, {versionKey: false});

providerScheme.plugin(uniqueValidator);

module.exports = mongoose.model('Provider', providerScheme);
