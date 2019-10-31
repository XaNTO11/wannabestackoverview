/**** External libraries ****/
const express = require('express'); // The express.js library for writing the API
const bodyParser = require('body-parser'); // Parse all JSON in incoming requests automatically
const morgan = require('morgan'); // Log out all http requests to the console
const cors = require('cors');
const mongoose = require('mongoose'); // We need the mongoose library
const path = require('path');



/**** Configuration ****/
const appName = "Wannabe stackoverview";
const port = (process.env.PORT || 8080); // Pick either port 8080 or the port in the PORT env variable.
const app = express(); // Get the express app.
app.use(morgan('combined')); // Log all requests to the console
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(cors()); // Enable Cross Origin Resource Sharing across all routes. Basically open up your API to everyone.
app.use(express.static('../client/build'));
// const url = (process.env.MONGO_URL || 'mongodb://localhost/kitten_db');
let mongoaccess = process.env.MONGO_DB

// mongoose.connect('mongodb://Brian:Brian1990@ds337718.mlab.com:37718/question_db', {useNewUrlParser: true, useUnifiedTopology: true})
//     .then((connection) => { // When the Promise resolves, we do some stuff.
//         console.log("Database connected");
//     })
//     .catch(e => { // If any errors happens during connection, we print them here.
//         console.error(e)
//     });

mongoose.connect(mongoaccess, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((connection) => { // When the Promise resolves, we do some stuff.
        console.log("Database connected");
    })
    .catch(e => { // If any errors happens during connection, we print them here.
        console.error(e)
    });

const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    answers: [{authorName: String, answer: String, votes: Number}]
})
mongoose.model('Questions', questionSchema);

const Question = mongoose.model('Questions');


    app.get(`/api/questions`, async (req, res) => {
        let questions = await Question.find();

        res.sendFile(path.join(__dirname,'build' ,'index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        return res.status(200).send(questions);

    });

app.get('/*', function(req, res) {

})

    app.post(`/api/questions`, async (req, res) => {
        let question = await Question.create(req.body);
        res.sendFile(path.join(__dirname,'build', 'index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        })
        return res.status(201).send({
            error: false,
            question
        })

    })

    app.get(`/api/question/:id`, async (req, res) => {
        const _id = req.params.id;
        let question = await Question.findById(_id);
        res.sendFile(path.join(__dirname,'build', 'index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        })
        return res.status(202).send({
            error: false,
            question
        })


    });

app.put(`/api/question/:id`, async (req, res) => {
    console.log(req.body)
    const _id = req.params.id;

    let question = await Question.findById(_id)
    question.answers.push(req.body)
    question.save();

    console.log(question, "Bahhhhh")

    res.sendFile(path.join(__dirname,'build', 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
    return res.status(202).send({
        error: false,
        question
    })



    // return res.status(202).send({
    //     error: false,
    //     question
    // })

});
    app.delete(`/api/question/:id`, async (req, res) => {
        const {id} = req.params;

        let question = await Question.findByIdAndDelete(id);

        return res.status(202).send({
            error: false,
            question
        })

    })
/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));