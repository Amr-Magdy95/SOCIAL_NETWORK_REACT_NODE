import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import { Link, Redirect } from "react-router-dom";
import DefaultPostPhoto from "../images/clouds.jpg";
import { isAuthenticated } from "../auth";
import Comment from "./Comment";

class SinglePost extends Component {
  state = {
    post: "",
    redirectToHome: false,
    redirectToSignin: false,
    likes: [],
    like: false,
    comments: []
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this post?!");
    if (answer) {
      this.deletePost();
    }
  };

  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            like: !this.state.like,
            likes: data.likes.length
          });
        }
      });
  };

  checkLike = likes => {
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const found = likes.find(like => like === userId) !== undefined;
    return found;
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("is post here", data);
          this.setState({
            post: data,
            likes: data.likes.length,
            like: this.checkLike(data.likes),
            comments: data.comments
          });
        }
      });
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            redirectToHome: true
          });
        }
      });
  };

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Anonymous";
    const { like, likes } = this.state;

    return (
      <div className="card col-md-12">
        <img
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
          className="card-img-top"
          src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
          onError={i => (i.target.src = `${DefaultPostPhoto}`)}
          alt={post.title}
        />
        {like ? (
          <h3 onClick={this.likeToggle} className="mt-2">
            <i
              className="fa fa-thumbs-up text-success bg-dark"
              style={{ padding: "10px", borderRadius: "50%" }}
            />{" "}
            {likes} Like(s)
          </h3>
        ) : (
          <h3 onClick={this.likeToggle} className="mt-2">
            <i
              className="fa fa-thumbs-up text-danger bg-dark"
              style={{ padding: "10px", borderRadius: "50%" }}
            />{" "}
            {likes} Like(s)
          </h3>
        )}
        <div className="card-body">
          <h5 className="card-header">{post.title}</h5>
          <p className="card-text">{post.body}</p>
          <br />
          <p className="font-italic mark">
            Posted By:
            <Link to={posterId}> {posterName} </Link>
            on {new Date(post.created).toDateString()}
          </p>

          <div className="d-inline-block">
            <Link className="btn btn-raised btn-secondary btn-sm mr-5" to={`/`}>
              Back to Posts
            </Link>
            {isAuthenticated().user &&
              isAuthenticated().user._id === post.postedBy && (
                <>
                  <Link
                    className="btn btn-raised btn-success btn-sm mr-5"
                    to={`/post/edit/${post._id}`}
                  >
                    Update Post
                  </Link>
                  <button
                    className="btn btn-raised btn-danger btn-sm"
                    onClick={this.deleteConfirmed}
                  >
                    Delete Post
                  </button>
                </>
              )}
          </div>
        </div>
      </div>
    );
  };

  updateComments = comments => {
    this.setState({ comments });
  };

  render() {
    const { post, redirectToHome, redirectToSignin } = this.state;
    if (redirectToHome) {
      return <Redirect to={`/`} />;
    } else if (redirectToSignin) {
      return <Redirect to={`/signin`} />;
    }
    return (
      <div className="container">
        <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
        {/*<h3>{this.props.match.params.postId} {this.state.post.title}</h3>*/}
        {!post ? (
          <div className="jumbotron text-center">
            <h2>Loading ...</h2>
          </div>
        ) : (
          this.renderPost(post)
        )}

        <Comment
          postId={post._id}
          comments={this.state.comments.reverse()}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}

export default SinglePost;
