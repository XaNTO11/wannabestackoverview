import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskQuestion from "./AskQuestion";

class Questions extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <React.Fragment>
                <h1>Questions</h1>
                <ul>
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
