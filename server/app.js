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
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Only needed when running build in production mode

const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    answers: [{authorName: String, answer: String, votes: Number}]
})
const Question = mongoose.model('Questions', questionSchema);

    app.get(`/api/questions`, async (req, res) => {
        let questions = await Question.find();
        return res.status(200).send(questions);

    });

app.get(`/api/question/:id`, async (req, res) => {
    const _id = req.params.id;
    let question = await Question.findById(_id);
    return res.status(202).send({
        error: false,
        question
    })
});

app.post(`/api/questions`, async (req, res) => {
        let question = await Question.create(req.body);
        return res.status(201).send({
            error: false,
            question
        })

    })

app.put(`/api/question/:id`, async (req, res) => {
    console.log(req.body)
    const _id = req.params.id;

    let question = await Question.findById(_id)
    question.answers.push(req.body)
    question.save();

    console.log(question, "Bahhhhh")
    return res.status(202).send({
        error: false,
        question
    })

});

app.put(`/api/question/answers/:id`, async (req, res) => {
    const _id = req.params.id;
    let answer = await Question.findOneAndUpdate({'answers._id': _id}, {$inc: {"answers.$.votes": req.body.votes}})
    return res.status(202).send(answer)
});

/**** Start! ****/
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);
const url = process.env.MONGO_DB

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((connection) => {
        app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
        console.log("Database connected");
    })
    .catch(e => { // If any errors happens during connection, we print them here.
        console.error(e)
    });
