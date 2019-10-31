import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskQuestion from "./AskQuestion";
// import Task from "../../../../Lesson 1/Exercise 2/frameworks_fall19/lesson03/todoapp_example/src/Task";

class Questions extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <React.Fragment>
                <h1>Questions</h1>
                <ul>{/* Cheap trick to define some data right in the render method and turn it into a list */}
                    {this.props.questionList.map(e =>
                        <li key={e._id}>
                            <Link to={`/question/${e._id}`}>{e.title}</Link>
                        </li>)}
                </ul>
                <AskQuestion askQuestion={(title, description) => this.props.askQuestion(title, description)}/>


            </React.Fragment>
        );
    }
}

export default Questions;
