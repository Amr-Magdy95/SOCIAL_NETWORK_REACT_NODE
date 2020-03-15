import React, { Component } from "react";
import { singlePost, updatePost } from "./apiPost";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from '../auth'
import DefaultPost from "../images/clouds.jpg";


class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      redirectToProfile: false,
      error: '',
      fileSize: 0,
      loading: false
    };
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({});
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  init = postId => {
    singlePost(postId)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          this.setState({ redirectToProfile: true });
        } else {
          this.setState({
            id: data._id,
            title: data.title,
            body: data.body
          });
        }
      });
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize: fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const postId = this.state.id;
      const token = isAuthenticated().token;

      updatePost(postId, token, this.postData)
        .then(data => {
          if (data.error) this.setState({ error: data.error });
          else {
            this.setState({
              loading: false,
              title: "",
              body: "",
              redirectToProfile: true
            });
          }
        });
    }
  };

  editPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>

      <div className="form-group">
        <label>Body</label>
        <textarea
          onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          value={body}
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Update Post
      </button>
    </form>
  );

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

  render() {
    const { id, title, body, redirectToProfile, error, loading} = this.state

    if( redirectToProfile){
      return <Redirect to={`/user/${isAuthenticated().user._id}`}/>
    }
    return (
      <div className="container">
        <h2>{title}</h2>
        {loading? (<div className="jumbotron text-center">
                    <h2>Loading ...</h2>
        </div>) : null}
        {error? (<div className="alert alert-danger">{error}</div>): null }
        <img
          style={{height: "200px", width: 'auto', borderRadius: "10px"}}
          className= "img-thumbnail"
          src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`}
          alt={title}
          onError={i => (i.target.src = `${DefaultPost}`)}
        />
        {this.editPostForm(title, body)}
      </div>
    );
  }
}

export default EditPost;
