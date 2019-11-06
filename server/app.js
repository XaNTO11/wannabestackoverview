/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


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
const Question = mongoose.model('Questions', questionSchema);

/**** Start! ****/

const url = process.env.MONGO_DB

mongoose.connect("mongodb://Brian:Brian1990@ds337718.mlab.com:37718/question_db", {useNewUrlParser: true, useUnifiedTopology: true})
    .then((connection) => {

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
