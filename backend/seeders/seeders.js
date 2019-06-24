const mongoose = require('mongoose');
require('dotenv').config({ path : '../.env'});
mongoose.connect('mongodb://localhost:27017/UsersProviders');

const ClientModel = require( '../models/Client');
const ProviderModel = require( '../models/Provider');
const clientData = require('./clients');
const providersData = require ('./providers');

Promise
    .all( clientData.map( item => new ClientModel(item).save() ))
    .then(results => console.log('all clients successfully created', results))
    .then(() => Promise.all( providersData.map( item => new ProviderModel(item).save() )))
    .then(results => {
        console.log('all clients successfully created', results);
        process.exit();
    })
    .catch( err => {
        console.log('something went wrong');
        process.exit();
    } );
