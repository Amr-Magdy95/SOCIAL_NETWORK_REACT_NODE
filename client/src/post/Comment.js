import React from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class Comment extends React.Component {
  state = {
    text: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      text: event.target.value,
      error: ""
    });
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    uncomment(userId, token, postId, comment)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
        } else {
          // dispatch a fresh list of  comments to the parent component (Single Post)
          this.props.updateComments(data.comments);
        }
      });

  }

  deleteConfirmed = (comment) => {
    let answer = window.confirm("Are you sure you want to delete this comment?!");
    if (answer) {
      this.deleteComment(comment);
    }
  };

  isValid = () => {
    const { text } = this.state;
    if (text.length <= 0) {
      this.setState({ error: "Comments should not be empty" });
      return false;
    }
    if (text.length >= 150) {
      this.setState({ error: "Comments must not exceed 150 characters" });
      return false;
    }
    return true;
  };

  addComment = event => {
    event.preventDefault();

    if (!isAuthenticated()) {
      this.setState({ error: "Please signin to leave a comment ! " });
      return false;
    }

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;

      comment(userId, token, postId, { text: this.state.text })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.error) {
          } else {
            this.setState({ text: "" });
            // dispatch a fresh list of  comments to the parent component (Single Post)
            this.props.updateComments(data.comments);
          }
        });
    }
  };

  render() {
    return (
      <div>
        <h2 className="mt-5 mb-5">Leave a Comment</h2>

        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.text}
              placeholder="Leave a comment here..."
            />
            <button className="btn btn-raised btn-success mt-2">
              Post Comment
            </button>
          </div>
        </form>

        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>

        <div className="col-md-12 col-md-offset-2">
          <h3 className="text-primary">
            {this.props.comments.length} Comments
          </h3>
          <hr />
          {this.props.comments.map((comment, i) => {
            return (
              <div key={i}>
                <div>
                  <Link to={`/user/${comment.postedBy._id}`}>
                    <img
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black"
                      }}
                      className="float-left mr-2"
                      height="30px"
                      onError={i => (i.target.src = `${DefaultProfile}`)}
                      width="30px"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                      alt={comment.postedBy.name}
                    />
                  </Link>

                  <div>
                    <p className="lead"> {comment.text} </p>
                  </div>
                  <p className="font-italic mark">
                    Posted By:
                    <Link to={comment.postedBy._id}>
                      {" "}
                      {comment.postedBy.name}{" "}
                    </Link>
                    on {new Date(comment.created).toDateString()}
                    {isAuthenticated().user &&
                      isAuthenticated().user._id === comment.postedBy._id && (
                        <>
                          <button
                            className="btn float-right mr-1 btn-danger btn-sm"
                            onClick={ () => {this.deleteConfirmed(comment)} }
                          >
                            Remove
                          </button>
                        </>
                      )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Comment;
