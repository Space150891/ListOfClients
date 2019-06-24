const Client = require('../models/Client.js');
const mongoose = require('mongoose');


module.exports = {
    createClient: async function (req, res) {
        const client = new Client({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        client
            .save()
            .then(doc => {
                res
                    .status(201)
                    .json({message: `Client saved successfully!`, data: doc});
            })
            .catch(err => {
                res
                    .status(400)
                    .json({
                        errors: err.message,
                    });
            })
    },
    updateClient: async function (req, res) {
        const props = {...req.body};
        if (props.providers) delete props.providers;
        Promise
            .all([
                Client
                    .updateOne({_id: req.params.clientId},
                        props,
                        {new: true})
                    .exec(),
                Client
                    .updateOne({_id: req.params.clientId},
                        {$push: {providers: req.body.providers}},
                        {new: true})
                    .exec()
            ])
            .then(() => {
                Client
                    .findOne({_id: req.params.clientId})
                    .populate('providers')
                    .exec()
                    .then(doc => {
                        res
                            .status(200)
                            .json({message: `Client updated successfully!`, data: doc});
                    })
            })
            .catch(err => {
                res
                    .status(400).json({
                    error: err.message
                });
            });

    },

    changeClientModel: async function (req, res) {
        const props = {...req.body};
        Client
            .updateOne({_id: req.params.clientId},
                props)
            .exec()
            .then(doc => {
                Client
                    .findOne({_id: req.params.clientId})
                    .populate('providers')
                    .exec()
                    .then(doc => {
                        res
                            .status(200)
                            .json({message: `Client updated successfully!`, data: doc});
                    })
            })
            .catch(err => {
                res
                    .status(400)
                    .json({
                        errors: err.message,
                    });
            });

    },

    deleteClient: async function (req, res) {
        Client
            .deleteOne({_id: req.params.clientId})
            .exec()
            .then(doc => {
                Client
                    .findOne({_id: req.params.clientId})
                    .populate('providers')
                    .exec()
                    .then(doc => {
                        res
                            .status(200)
                            .json({message: `Client deleted successfully!`, data: doc});
                    })
            })
            .catch(err => {
                res
                    .status(400)
                    .json({
                        errors: err.message,
                    });
            });
    },
    getClient: async function (req, res) {
        Client
            .findOne({_id: req.params.clientId})
            .populate('providers')
            .exec()
            .then(doc => {
                res
                    .status(200)
                    .json({message: `Client found successfully!`, data: doc});
            })
            .catch(err => {
                res
                    .status(400)
                    .json({
                        errors: err.message,
                    });
            });
    },
    getAllClients: async function (req, res) {
        Client
            .find({})
            .populate('providers')
            .sort('_id')
            .exec()
            .then(docs => {
                res
                    .status(200)
                    .json({message: `All clients data`, data: docs});
            })
            .catch(err => {
                res
                    .status(400)
                    .json({
                        errors: err.message,
                    });
            });
    },


};
