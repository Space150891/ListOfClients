const express = require('express');
const clientController = require('../controllers/clientController.js');
const clientRouter = express.Router();

clientRouter.post('/', clientController.createClient);
clientRouter.patch('/:clientId', clientController.updateClient);
clientRouter.put('/:clientId', clientController.changeClientModel);
clientRouter.delete('/:clientId', clientController.deleteClient);
clientRouter.get('/:clientId', clientController.getClient);
clientRouter.get('/', clientController.getAllClients);

module.exports = clientRouter;
