const express = require('express');
const providerController = require('../controllers/providerController.js');
const providerRouter = express.Router();

providerRouter.post('/', providerController.createProvider);
providerRouter.patch('/:providerId', providerController.updateProvider);
providerRouter.put('/:providerId', providerController.changeProviderModel);
providerRouter.delete('/:providerId', providerController.deleteProvider);
providerRouter.get('/:providerId', providerController.getProvider);
providerRouter.get('/', providerController.getAllProviders);

module.exports = providerRouter;
