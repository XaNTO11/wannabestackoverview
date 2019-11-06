/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const checkJwt = require('express-jwt');    // Check for access tokens automatically
const bcrypt = require('bcryptjs');         // Used for hashing passwords!


/**** Configuration ****/
const appName = "Wannabe stackoverview";
const port = (process.env.PORT || 8080);
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static('../client/build'));

const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    answers: [{authorName: String, answer: String, votes: Number}]
})

const userSchema = new mongoose.Schema({
    username: String,
    hash: String
})

const MUser = mongoose.model('Users', userSchema);
const Question = mongoose.model('Questions', questionSchema);

let openPaths = [
    {url: '/api/users/authenticate', methods: ['POST']},
    {url: '/api/questions', methods: ['GET']},
    {url: '/api/questions/', methods: ['GET']},
    {url: /\/api\/question\/[\w]+/gi, methods: ['GET']}

];
const secret = "the cake is a lie";
app.use(checkJwt({ secret: secret }).unless({ path : openPaths }));

// This middleware checks the result of checkJwt
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { // If the user didn't authorize correctly
        res.status(401).json({ error: err.message }); // Return 401 with error message.
    } else {
        next(); // If no errors, send request to next middleware or route handler
    }
});
const users = [
    // These are just some test users with passwords.
    // The passwords are in clear text for testing purposes. (don't do this in production)
    { id: 0, username: "krdo", password: '123'},
    { id: 1, username: "tosk", password: 'password'},
    { id: 2, username: "mvkh", password: 'l33th0xor'},
];
users.forEach(user => {
    bcrypt.hash(user.password, 10, function(err, hash) {
        user.hash = hash; // The hash has been made, and is stored on the user object.
        delete user.password; // The clear text password is no longer needed
        console.log(`Hash generated for ${user.username}`, user); // For testing purposes
    });
});

/**** Start! ****/

const url = process.env.MONGO_DB

mongoose.connect("mongodb://Brian:Brian1990@ds337718.mlab.com:37718/question_db", {useNewUrlParser: true, useUnifiedTopology: true})
    .then((connection) => {

        const usersRouter = require('./users_router')(users, secret);
        app.use('/api/users', usersRouter);

        const questionsRouter = require('./questions_routes')(Question);
        app.use('/api/questions', questionsRouter);

        const questionRouter = require('./question_routes')(Question);
        app.use('/api/question', questionRouter);

        app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
        console.log("Database connected");

        app.get('*', (req, res) =>
            res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
        );
    })
    .catch(e => { // If any errors happens during connection, we print them here.
        console.error(e)
    });
