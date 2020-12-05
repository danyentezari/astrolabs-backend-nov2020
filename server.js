// Import the main express file as a function
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const ProductRoutes = require('./routes/ProductRoutes');
const UserRoutes = require('./routes/UserRoutes');
const initPassportStrategy = require('./passport-config');


// Invoke express
const server = express();
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
// configure express to use passport
server.use(passport.initialize());
// configure passport to use passport-jwt
initPassportStrategy(passport);

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

// Sample route
server.get(
    '/', // http://www.apple.com/
    (req, res) => {
        res.send("<h1>Welcome to Home</h1>")
    }
);

// Users route
server.use(
    '/users',
    UserRoutes
);

// Products
server.use(
    '/products',
    passport.authenticate('jwt', {session: false}),
    ProductRoutes
);

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