class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store kittens in MongoDB
        const questionSchema = new mongoose.Schema({
            title: String,
            description: String,
            answers: [{authorName: String, answer: String, votes: Number}]
        })

        // This model is used in the methods of this class to access kittens
        // this.kittenModel = mongoose.model('kitten', kittenSchema);
        this.questionsModel = mongoose.model('Questions', questionSchema);
    }

    async getData() {
        try {
            return await this.questionsModel.find({});
        } catch (error) {
            console.error("getKittens:", error.message);
            return {};
        }
    }

    async getQuestion(_id) {
        try {
            return await this.questionsModel.findById(_id);
        } catch (error) {
            console.error("getKitten:", error.message);
            return {};
        }
    }

    // async createKitten(newKitten) {
    //     // TODO: Error handling
    //     let kitten = new this.kittenModel(newKitten);
    //     return kitten.save();
    // }
    async askQuestion(newQuestion) {
        // TODO: Error handling
        let question = new this.questionsModel(newQuestion);
        return question.save();
    }

    // async addHobby(kittenId, hobby) {
    //     // TODO: Error handling
    //     const kitten = await this.getKitten(kittenId);
    //     kitten.hobbies.push(hobby);
    //     return kitten.save();
    // }
    async postAnswer(author, answer, votes, qID) {
        // TODO: Error handling
        const question = await this.getQuestion(qID);
        console.log(question, "Spørgsmål");
        question.answers.push({authorName: author, answer: answer, votes: votes});
        return question.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of kittens to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    // async bootstrap(count = 10) {
    //     const hobbies = ['sleeping', 'purring', 'eating', 'people watching'];
    //     function getRandomInt(min, max) {
    //         return Math.floor(Math.random() * (max - min + 1) + min);
    //     }
    //
    //     function getRandomName() {
    //         return ['Garfield', 'Tom', 'Felix', 'Snowball'][getRandomInt(0,3)]
    //     }
    //
    //     function getRandomHobbies() {
    //         const shuffled = hobbies.sort(() => 0.5 - Math.random());
    //         return shuffled.slice(0, getRandomInt(1,shuffled.length));
    //     }
    //
    //     let l = (await this.getKittens()).length;
    //     console.log("Kitten collection size:", l);
    //
    //     if (l === 0) {
    //         let promises = [];
    //
    //         for (let i = 0; i < count; i++) {
    //             let kitten = new this.kittenModel({
    //                 name: getRandomName(),
    //                 hobbies: getRandomHobbies()
    //             });
    //             promises.push(kitten.save());
    //         }
    //
    //         return Promise.all(promises);
    //     }
    // }
}

// We export the object used to access the kittens in the database
module.exports = mongoose => new Db(mongoose);