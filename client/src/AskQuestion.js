import React, {Component} from 'react';
// import Questions from "./Questions";

class AskQuestion extends Component {

    constructor(props) {
        super(props); // You always need this line in the constructor to call the constructor in the super class.
        this.state = { // When initializing the state in the constructor, you just create it as an object.
            title: "", // input is initialized to the empty string.
            description: ""
        }
    }

    handleChange(event) {
      this.setState( {
          [event.target.name]: event.target.value
          })

    }
    handleButtonClick(event) {
        event.preventDefault();
        // this.props.askQuestion(this.state.title, this.state.description); // Add the task to the state in App.js
        this.props.askQuestion(this.state.title, this.state.description); // Add the task to the state in App.js

    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="itemText">Title of question <br/></label>
                            <input type="text" className="form-control" name="title"
                                   placeholder="title of question"
                                   onChange={event => this.handleChange(event)}
                            />
                            <br/>
                            <label htmlFor="itemText">Question<br/></label>
                            <input type="text" className="form-control" name="description"
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
        )
    }
}
export default AskQuestion;


