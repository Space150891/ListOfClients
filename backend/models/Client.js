const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const validator = require('../validators/validators.js');

const clientScheme = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: validator.emailValidator,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        default: null,
        validate: validator.phoneValidator
    },
    providers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        default: []
    }],
}, {versionKey: false});
clientScheme.plugin(uniqueValidator);
module.exports = mongoose.model('Client', clientScheme);
