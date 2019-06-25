const Provider = require('../models/Provider.js');
const mongoose = require('mongoose');


module.exports = {
    createProvider: async function (req, res) {
        const provider = new Provider({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        provider
            .save()
            .then(doc => {
                res
                    .status(201)
                    .json({message: "Provider saved successfully", data: doc});
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        errors: err.message,
                    });
            })
    },
    updateProvider: async function (req, res) {
        const props = {...req.body};
        Provider
            .updateOne({_id: req.params.providerId},
                props,
                {new: true})
            .exec()
            .then(result => {
                Provider
                    .findOne({_id: req.params.providerId})
                    .exec()
                    .then(doc => {
                        res
                            .status(200)
                            .json({message: "Provider updated successfully", data: doc});
                    })
            })
            .catch(err => {
                res
                    .status(500).json({
                    error: err.message
                });
            });

    },
    changeProviderModel: async function (req, res) {
        const props = {...req.body};
        Provider
            .updateOne({_id: req.params.providerId},
                props,
                {new: true})
            .exec()
            .then(result => {
                Provider
                    .findOne({_id: req.params.providerId})
                    .exec()
                    .then(doc => {
                        res
                            .status(200)
                            .json({message: "Provider updated successfully", data: doc});
                    })
            })
            .catch(err => {
                res
                    .status(500).json({
                    error: err.message
                });
            });

    },
    deleteProvider: async function (req, res) {
        Provider
            .deleteOne({_id: req.params.providerId})
            .exec()
            .then(doc => {
                Provider
                    .findOne({_id: req.params.providerId})
                    .exec()
                    .then(doc => {
                        res
                            .status(200)
                            .json({message: "Provider deleted successfully", data: doc});
                    })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        errors: err.message,
                    });
            });
    },
    getProvider: async function (req, res) {
        Provider
            .findOne({_id: req.params.providerId})
            .exec()
            .then(doc => {
                res
                    .status(200)
                    .json({message: "Provider found successfully", data: doc});
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        errors: err.message,
                    });
            });
    },
    getAllProviders: async function (req, res) {
        Provider
            .find({})
            .sort('name')
            .exec()
            .then(docs => {
                res
                    .status(200)
                    .json({message: "All providers data ", data: docs});
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        errors: err.message,
                    });
            });
    },


};
