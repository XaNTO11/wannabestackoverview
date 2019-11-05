import React, {Component} from 'react';
import {Link} from "@reach/router";
import AskQuestion from "./AskQuestion";
import PostAnswer from "./PostAnswer";
// import Difficulity from "./Difficulity";

class Question extends Component {
    constructor(props){
        super(props);
        console.log(this.props.getQuestion(this.props.id), "Test")
        console.log(this.props.id, "porps ID!")
        // this.state = {
        //     question: this.props.getRecipe(this.props.id),
        //     answers: [...this.props.getRecipe(this.props.id).answers]
        // }
    }
    downVote(vote, aID){

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
                                    <Vote Vote={() => this.props.Vote()}></Vote>
                                </li>)}
                        </ul>
                        {/*<Link to="/">Back</Link>*/}
                    </React.Fragment>
            }

            return content;
        // let title = "Question not found";
        //
        // // if (this.state.question) {
        // //     title = this.state.question.title;
        // // }
        // if (this.props.getQuestion(this.props.id)) {
        //     title = this.props.getQuestion(this.props.id).title;
        // }
        // return(
        //     <React.Fragment>
        //         <Link to={`/`}>back to questions</Link>
        //         <h1>{title}</h1>
        //         {/*<p>{this.state.question.description}</p>*/}
        //         <p>{this.props.getQuestion(this.props.id).description}</p>
        //         <h4>Svar</h4>
        //         <PostAnswer postAnswer={(author, answer, votes) => this.props.postAnswer(author, answer, votes ,this.props.id )}/>
        //         <ul>
        //             {this.props.getQuestion(this.props.id).answers.map(e =>
        //                 <li key={e._id}>
        //                     <p> Skrevet af: {e.authorName}</p>
        //                     <p>{e.answer}</p>
        //                 </li>)}
        //         </ul>
        //     </React.Fragment>
        // );
    }
}

export default Question;
