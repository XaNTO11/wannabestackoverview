import React, {Component} from 'react';
// import Questions from "./Questions";

class PostAnswer extends Component {

    constructor(props) {
        super(props); // You always need this line in the constructor to call the constructor in the super class.

        this.state = { // When initializing the state in the constructor, you just create it as an object.
             votes: 0
        };
    }
    // handleChange(event) {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }

    handleButtonClickUpvote(event) {
        event.preventDefault(); // Prevents the form button reloading the whole page. We don't do reloads in a SPA.
        this.setState({
           votes: 1
        })
        this.props.Vote(1); // Add the task to the state in App.js
        // console.log(this.state.votes, "Upvote pressed")

        // this.props.addTask is actually the arrow function in App.js (from the render method)
        // defined in <AddTask addTask={(task) => this.addTask(task)}/>
    }
    handleButtonClickDownvote(event) {
        event.preventDefault(); // Prevents the form button reloading the whole page. We don't do reloads in a SPA.
        this.setState({
            votes: -1
        })
        this.props.Vote(this.state.votes); // Add the task to the state in App.js
        // console.log(-1, "Downvote pressed")

        // this.props.addTask is actually the arrow function in App.js (from the render method)
        // defined in <AddTask addTask={(task) => this.addTask(task)}/>
    }


    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <button onClick={(event) => this.handleButtonClickDownvote(event)}
                                type="submit" id="submitItemBtn" className="btn btn-primary">downvote
                        </button>
                        <button onClick={(event) => this.handleButtonClickUpvote(event)}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Upvote
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default PostAnswer;


