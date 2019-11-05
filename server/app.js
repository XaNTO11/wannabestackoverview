/**** External libraries ****/
// const express = require('express'); // The express.js library for writing the API
// const bodyParser = require('body-parser'); // Parse all JSON in incoming requests automatically
// const morgan = require('morgan'); // Log out all http requests to the console
// const cors = require('cors');
// const mongoose = require('mongoose'); // We need the mongoose library
// const path = require('path');
//

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
// const port = (process.env.PORT || 8080); // Pick either port 8080 or the port in the PORT env variable.
// const app = express(); // Get the express app.
// app.use(morgan('combined')); // Log all requests to the console
// app.use(bodyParser.json()); // Parse JSON from the request body
// app.use(cors()); // Enable Cross Origin Resource Sharing across all routes. Basically open up your API to everyone.
// app.use(express.static('../client/build'));
// const url = (process.env.MONGO_URL || 'mongodb://localhost/kitten_db');

// mongoose.connect('mongodb://Brian:Brian1990@ds337718.mlab.com:37718/question_db', {useNewUrlParser: true, useUnifiedTopology: true})
//     .then((connection) => { // When the Promise resolves, we do some stuff.
//         console.log("Database connected");
//     })
//     .catch(e => { // If any errors happens during connection, we print them here.
//         console.error(e)
//     });



const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    answers: [{authorName: String, answer: String, votes: Number}]
})
const Question = mongoose.model('Questions', questionSchema);

// const Question = mongoose.model('Questions');
// const questionDAL = require('./questions_dal')(mongoose);

    app.get(`/api/questions`, async (req, res) => {
        let questions = await Question.find();
        return res.status(200).send(questions);

    });
// app.get('/api/questions', (req, res) => {
//     // Get all kittens. Put kitten into json response when it resolves.
//     questionDAL.getData().then(questions => res.json(questions));
// });

app.get(`/api/question/:id`, async (req, res) => {
    const _id = req.params.id;
    let question = await Question.findById(_id);
    return res.status(202).send({
        error: false,
        question
    })
});
app.get(`/api/question/answers/:id`, async (req, res) => {
    const _id = req.params.id;
    let answers = await Question.findOne({'answers._id': _id}, 'authorName answer',function (err, person){
        if (err) return handleError(err);
        return res.status(202).send({
            error: false,
            person
        })
        // console.log(person.authorName)
    } );
    // let answers = await Question.find({"answers": {_id: _id}})
    // console.log(Question.findById(_id).title)

});

// app.get('/api/question/:id', (req, res) => {
//     const _id = req.params.id;
//     questionDAL.getQuestion(_id).then(question => res.json(question));
// });

// app.post('/api/questions', (req, res) => {
//     // let kitten = {
//     //     name : req.body.name,
//     //     hobbies : [] // Empty hobby array
//     // };
//     let question = {
//         title: req.body.title,
//         description: req.body.description,
//         answers: []
//     }
//     questionDAL.askQuestion(question).then(newQuestion => res.json(newQuestion));
// });

    app.post(`/api/questions`, async (req, res) => {
        let question = await Question.create(req.body);
        return res.status(201).send({
            error: false,
            question
        })

    })

// app.put('/api/question/:id', (req, res) => {
//     // To add a hobby, you need the id of the kitten, and some hobby text from the request body.
//     questionDAL.postAnswer(req.params.author, req.params.answer, req.params.id)
//         .then(updatedQuestion => res.json(updatedQuestion));
// });
//
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
//     app.delete(`/api/question/:id`, async (req, res) => {
//         const {id} = req.params;
//
//         let question = await Question.findByIdAndDelete(id);
//
//         return res.status(202).send({
//             error: false,
//             question
//         })
//
//     })
/**** Start! ****/
app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
);
const url = process.env.MONGO_DB

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((connection) => { // When the Promise resolves, we do some stuff.
        app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
        console.log("Database connected");
    })
    .catch(e => { // If any errors happens during connection, we print them here.
        console.error(e)
    });
