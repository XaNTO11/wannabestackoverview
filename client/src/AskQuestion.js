import React, {Component} from 'react';

class AskQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
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
        this.props.askQuestion(this.state.title, this.state.description);

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
                                type="submit" id="submitItemBtn" className="btn btn-primary">Ask Question
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default AskQuestion;


