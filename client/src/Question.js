import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskQuestion from "./AskQuestion";
import PostAnswer from "./PostAnswer";
// import Difficulity from "./Difficulity";

class Question extends Component {
    constructor(props){
        super(props);
        console.log(this.props.getRecipe(this.props.id), "Test")
        console.log(this.props.id)
        // this.state = {
        //     question: this.props.getRecipe(this.props.id),
        //     answers: [...this.props.getRecipe(this.props.id).answers]
        // }
    }

    render() {
        let title = "Recipe not found";

        // if (this.state.question) {
        //     title = this.state.question.title;
        // }
        if (this.props.getRecipe(this.props.id)) {
            title = this.props.getRecipe(this.props.id).title;
        }
        return(
            <React.Fragment>
                <Link to={`/`}>back to recipes</Link>
                <h1>{title}</h1>
                {/*<p>{this.state.question.description}</p>*/}
                <p>{this.props.getRecipe(this.props.id).description}</p>
                <h4>Svar</h4>
                <PostAnswer postAnswer={(author, answer) => this.props.postAnswer(author, answer, this.props.id )}/>
                <ul>
                    {this.props.getRecipe(this.props.id).answers.map(e =>
                        <li key={e._id}>
                            <p> Skrevet af: {e.authorName}</p>
                            <p>{e.answer}</p>
                        </li>)}
                </ul>
            </React.Fragment>
        );
    }
}

export default Question;
