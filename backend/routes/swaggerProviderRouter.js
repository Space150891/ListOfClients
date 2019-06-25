const express = require('express');
const providerController = require('../controllers/providerController.js');
const providerRouter = express.Router();


providerRouter
    .route('/providers')
    .post(providerController.createProvider)
    .get(providerController.getAllProviders);

providerRouter
    .route('/providers/:providerId')
    .get(providerController.getProvider)
    .put(providerController.changeProviderModel)
    .delete(providerController.deleteProvider);

module.exports = providerRouter;
