import React, {Component} from 'react';
// import Questions from "./Questions";

class PostAnswer extends Component {

    constructor(props) {
        super(props); // You always need this line in the constructor to call the constructor in the super class.

        this.state = { // When initializing the state in the constructor, you just create it as an object.
            author: "", // input is initialized to the empty string.
            answer: ""
        };
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleButtonClick(event) {
        event.preventDefault(); // Prevents the form button reloading the whole page. We don't do reloads in a SPA.
        this.props.postAnswer(this.state.author, this.state.answer); // Add the task to the state in App.js

        // this.props.addTask is actually the arrow function in App.js (from the render method)
        // defined in <AddTask addTask={(task) => this.addTask(task)}/>
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="itemText">Author <br/></label>
                            <input type="text" className="form-control" name="author"
                                   placeholder="title of question"
                                   onChange={event => this.handleChange(event)}
                            />
                            <br/>
                            <label htmlFor="itemText">Answer<br/></label>
                            <input type="text" className="form-control" name="answer"
                                   placeholder="title of question"
                                   onChange={event => this.handleChange(event)}
                            />
                        </div>
                        <button onClick={(event) => this.handleButtonClick(event)}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Add Task
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default PostAnswer;


