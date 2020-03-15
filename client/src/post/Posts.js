import React, { Component } from "react";
import { list } from "./apiPost";
import { Link } from "react-router-dom";
import DefaultPostPhoto from "../images/clouds.jpg";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount = () => {
    list()
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            posts: data
          });
        }
      });
  };

  renderPosts = posts => (
    <div className="row">
      {posts.map((post, i) => {
        //console.log(post)
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Anonymous";
        return (
          <div className="card col-md-4 col-log-4" key={i}>
            <img
              style={{ height: "200px", width: "100%" }}
              className="card-img-top"
              src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
              onError={i => (i.target.src = `${DefaultPostPhoto}`)}
              alt={post.title}
            />
            <div className="card-body">
              <h5 className="card-header">{post.title}</h5>
              <p className="card-text">{post.body.substring(0, 100)}</p>
              <br />
              <p className="font-italic mark">
                Posted By:
                <Link to={posterId}> {posterName} </Link>
                on {new Date(post.created).toDateString()}
              </p>

              <Link
                className="btn btn-raised btn-secondary btn-sm"
                to={`/post/${post._id}`}
              >
                See More
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );

  render() {
    const { posts } = this.state;
    console.log(posts);
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{!posts.length? 'LOADING ...': 'Recent Posts'}</h2>

        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
