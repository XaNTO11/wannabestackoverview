import React, {Component} from 'react';

class PostAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: "",
            answer: "",
            votes: 0
        };
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleButtonClick(event) {
        event.preventDefault(); // Prevents the form button reloading the whole page. We don't do reloads in a SPA.
        this.props.postAnswer(this.state.author, this.state.answer, this.state.votes); // Add the task to the state in App.js
        this.setState({
            author:"",
            answer:""
        })
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
                                type="submit" id="submitItemBtn" className="btn btn-primary">Post answer
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default PostAnswer;


