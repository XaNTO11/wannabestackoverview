import React, {Component} from 'react';
import './App.css';
import Question from './Question'
import Questions from "./Questions";
import {Router} from "@reach/router";

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
      console.log(process.env.NODE_ENV)
    const url = `${this.API_URL}/questions`;
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questionList: json
        })
  }

  getQuestion(_id){
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
          console.log("Result of posting a new task:");
          console.log(json);
          this.getData();
        });
  }


  postAnswer(author, answer, votes, qID) {
    const url = `${this.API_URL}/question/`+ qID;
    console.log(votes, "Se hvor mange votes")
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
    Vote(vote, aId){
        let votes = vote
        console.log(this.state.questionList, "Questions")
        console.log(aId, "Answer ID")
        console.log(votes, "Up or Downvote")
  }

  render() {
    return (
        <React.Fragment>
          <Router>
            <Questions path="/" questionList={this.state.questionList} askQuestion={(title, description) => this.askQuestion(title, description)}/>
            <Question path="/question/:id" getQuestion={(_id) => this.getQuestion(_id)} postAnswer={(author, answer, votes, qID) => this.postAnswer(author, answer, votes, qID)} Vote={(vote, aId) => this.Vote(vote, aId)}/>
          </Router>

        </React.Fragment>
    );
  }
}

export default App;
