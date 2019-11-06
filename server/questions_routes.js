module.exports = (Question) => {
    let express = require('express');
    let router = express.Router();

    router.get(`/`, async (req, res) => {
        let questions = await Question.find();
        return res.status(200).send(questions);

    });

    router.post(`/`, async (req, res) => {
        let question = await Question.create(req.body);
        return res.status(201).send({
            error: false,
            question
        })

    })

    return router;
};