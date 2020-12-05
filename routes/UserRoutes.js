const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel.js');

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
    
        /*
         * Here we check for (A) uniques emails and
         * (B) prepare password for registration
         */
    
        /* Part (A) */
        // 1. Search the database for a matching email address
        UserModel
        .findOne({ email: formData.email })
        .then(
            (document) => {

                // 2.1. If there is a match, reject the registration
                if(document) {
                    res.send({ message: "An account with that email already exists." })
                }

                // 2.2. If there is not match, proceed to Part (B)
                else {
                    /* Part (B) */
                    // 1. Generate a salt
                    bcrypt.genSalt(
                        (err, salt) => {

                            // 2. Take salt and user's password to hash password
                            bcrypt.hash(
                                formData.password,
                                salt,
                                (err, encryptedPassword) => {
                                    // 3. Replace the user's password with the hash
                                    newUserModel.password = encryptedPassword;

                                    // 4. Save to the database
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
                            )
                        }
                    )
                }
            }
        )
        .catch(
            (err) => {
                res.send({err: "Something went wrong."})
            }
        )
    }
);

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

module.exports = router;