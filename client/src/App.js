import React, {Component} from 'react';
import './App.css';
import Question from './Question'
import Questions from "./Questions";
import {Router} from "@reach/router";
import { stringArraysEqual } from './Util';

class App extends Component {

    API_URL = process.env.REACT_APP_API_URL

  constructor(props) {
    super(props);

    this.state = {
      questionList: []
    };
  }
  componentDidMount() {
    this.getData().then(() => console.log("Data gotten"));
  }
    async getData() {
    const url = `${this.API_URL}/questions`;
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questionList: json
        })
  }
    // async loadQuestionData(id) {
    //     const updateQuestion = (question) => {
    //         const index = this.state.questionList.findIndex(k => k._id === id);
    //         if (index === -1) return; // Return if kitten is not yet in app.js state
    //         const localQuestion = this.state.questionList[index];
    //
    //         // See if the kitten has new data
    //         let equal = stringArraysEqual(JSON.stringify(question.answers), JSON.stringify(localQuestion.answers));
    //
    //         // Only update state if data is new (not equal)!
    //         // Otherwise, this will result in an infinite React re-render loop!
    //         if (!equal) {
    //             console.log("Updating local kitten state with new data", question._id);
    //             const newQuestionsState = this.state.questionList;
    //             newQuestionsState[index] = question; // Replace old data with new
    //             this.setState({ // Update state
    //                 questionList: newQuestionsState
    //             })
    //         }
    //     };
    //     try {
    //         let url = `${this.API_URL}/question/${id}`; // URL of the API.
    //         let result = await fetch(url); // Get the data
    //         let question = await result.json(); // Turn it into json
    //         updateQuestion(question); // Kitten loaded, let's update state.
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    getQuestion(_id){
        // this.loadQuestionData(_id).then(console.log("Kitten fetched", _id));
        // Find the relevant kitten by id - not waiting for new data.
        // return this.state.questionList.find(k => k._id === id);
      return this.state.questionList.find(e => e._id === String(_id));
  }

  askQuestion(title, description) {
    const url = `${this.API_URL}/questions`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
        .then(response => response.json())
        .then(json => {
          this.getData();
        });
  }


  postAnswer(author, answer, votes, qID) {
    const url = `${this.API_URL}/question/`+ qID;
    fetch(url, {
          method: 'PUT',
          body: JSON.stringify({
              authorName: author,
              answer: answer,
              votes: votes
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
          .then(response => response.json())
          .then(json => {
              this.getData();
          });
  }
    Vote(votes, aId){
        const url = `${this.API_URL}/question/answers/`+ aId;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                votes: votes
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                this.getData();
            });
  }
  render() {
    return (
        <React.Fragment>
          <Router>
            <Questions path="/" questionList={this.state.questionList} askQuestion={(title, description) => this.askQuestion(title, description)}/>
            <Question path="/question/:id" getQuestion={(_id) => this.getQuestion(_id)} postAnswer={(author, answer, votes, qID) => this.postAnswer(author, answer, votes, qID)} Vote={(votes, aId) => this.Vote(votes, aId)}/>
          </Router>

        </React.Fragment>
    );
  }
}

export default App;
