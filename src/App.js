import React, {Component} from 'react';
import './App.css';
import Question from './Question'
import Questions from "./Questions";
import {Router} from "@reach/router";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questionList: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const url = `${this.API_URL}/questions`;
    fetch(url)
        .then(result => result.json()) // Convert to JSON
        .then(result => { // Put it in the state
          this.setState({
            questionList: result
          })
        })
        .catch((error) => { // Catch any errors and write them to the browser console
          console.error(error);
        });
  }

  getRecipe(_id){
    return this.state.questionList.find(e => e._id === String(_id));
  }

  askQuestion(title, description) {
    const url = `api/questions`;
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

  postAnswer(author, answer, qID) {
    const url = `${this.API_URL}/question`+ qID;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        authorName: author,
        answer: answer,
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
            <Question path="/question/:id" getRecipe={(_id) => this.getRecipe(_id)} postAnswer={(author, answer, qID) => this.postAnswer(author, answer, qID)}/>
            {/*<Filter path="/recipe/with/:filter" getFilter={(ingredient) => this.getFilter(ingredient)}/>*/}
          </Router>

        </React.Fragment>
    );
  }
}

export default App;
