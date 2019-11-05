import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";
import Vote from "./Vote";

class Question extends Component {
    constructor(props){
        super(props);
    }

    render() {
            const question = this.props.getQuestion(this.props.id);
            let content = <p>Loading</p>;
            if (question) {
                content =
                    <React.Fragment>
                        <Link to={`/`}>back to questions</Link>
                        <h1>{question.title}</h1>
                        <p>{this.props.getQuestion(this.props.id).description}</p>
                        <h4>Svar</h4>
                        <PostAnswer postAnswer={(author, answer, votes) => this.props.postAnswer(author, answer, votes ,this.props.id )}/>
                        <ul>
                            {this.props.getQuestion(this.props.id).answers.map(e =>
                                <li key={e._id}>
                                    <p> Skrevet af: {e.authorName}</p>
                                    <p>{e.answer}</p>
                                    <p>votes {e.votes}</p>
                                    <Vote Vote={(votes) => this.props.Vote(votes, e._id)}></Vote>
                                </li>)}
                        </ul>
                    </React.Fragment>
            }

            return content;
    }
}

export default Question;
