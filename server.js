// Import the main express file as a function
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserModel = require('./models/UserModel.js');
const ProductModel = require('./models/ProductModel.js');

// Invoke express
const server = express();
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

const dbString = "mongodb+srv://admin01:db12345@cluster0.oikl7.mongodb.net/test2?retryWrites=true&w=majority";

mongoose
    .connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            console.log('db is connected')
        }
    )
    .catch(
        (error) => {
            console.log('db is NOT connected. An error occured.', error)
        }
    )


server.get(
    '/', // http://www.apple.com/
    (req, res) => {
        res.send("<h1>Welcome to Home</h1>")
    }
);

server.get(
    '/users',
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
)

server.get(
    '/products',
    (req, res) => {
        ProductModel
        .find()
        .then(
            (document) => {
                res.send(document);
            }
        )
        .catch(
            (error) => {
                console.log('error', error);
            }
        )
    }
)


server.post(
    '/products',
    (req, res) => {
       
        const formData = {
            brand: 'Google',
            model: 'Pixel 5',
            price: 2500
        };

        const newProduct = new ProductModel(formData);

        newProduct
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


server.post(
    '/users',
    (req, res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.email
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
)

server.get(
    '*',
    (req, res) => {
        res.send('<h1>404</h1>')
    }
);


// Connects a port number on the server
server.listen(
    3001, 
    ()=>{
        console.log('server is running on http://localhost:3001');
    }
);