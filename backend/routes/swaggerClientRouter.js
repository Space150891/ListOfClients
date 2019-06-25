const express = require('express');
const clientController = require('../controllers/clientController.js');
const clientRouter = express.Router();


clientRouter
    .route('/clients')
    .post(clientController.createClient)
    .get(clientController.getAllClients);

clientRouter
    .route('/clients/:clientId')
    .get(clientController.getClient)
    .put(clientController.changeClientModel)
    .delete(clientController.deleteClient);

module.exports = clientRouter;
