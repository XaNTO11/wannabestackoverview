module.exports = (Question) => {
    let express = require('express');
    let router = express.Router();

    router.get(`/:id`, async (req, res) => {
        const _id = req.params.id;
        let question = await Question.findById(_id);
        return res.status(202).send({
            error: false,
            question
        })
    });

    router.put(`/:id`, async (req, res) => {
        const _id = req.params.id;

        let question = await Question.findById(_id)
        question.answers.push(req.body)
        question.save();

        return res.status(202).send({
            error: false,
            question
        })
    });
    router.put(`/answers/:id`, async (req, res) => {
        const _id = req.params.id;
        let answer = await Question.findOneAndUpdate({'answers._id': _id}, {$inc: {"answers.$.votes": req.body.votes}})
        return res.status(202).send(answer)
    });



    return router;
};