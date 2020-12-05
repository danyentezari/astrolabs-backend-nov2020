const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel.js');

router.get(
    '/',               // https://www.app.com/users
    (req, res) => {
        UserModel
        .find()
        .then(
            (document) => {
                console.log('user', document);
                res.send(document);
            }
        )
        .catch(
            (error) => {
                console.log('error', error)
            }
        )
    }
);

router.post(
    '/',
    (req, res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        const newUserModel = new UserModel(formData);
    
        newUserModel
        .save()
        .then(
            (document) => {
                res.send(document)
            }
        )
        .catch(
            (error) => {
                console.log('error', error);
                res.send({'error': error})
            }
        )
    }
);

module.exports = router;