import React, {Component} from 'react';

class PostAnswer extends Component {

    constructor(props) {
        super(props);
    }

    handleButtonClickUpvote(event) {
        event.preventDefault();

        this.props.Vote(1);
    }
    handleButtonClickDownvote(event) {
        event.preventDefault();
        this.props.Vote(-1);
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


