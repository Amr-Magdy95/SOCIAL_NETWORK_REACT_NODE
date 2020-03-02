import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";
import { isAuthenticated } from "../auth/index.js";

class FindPeople extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      open: false,
      followMessage: ""
    };
  }

  componentDidMount = () => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token)
      .then(response => {
        //console.log('response', response.json())
        return response.json();
      })
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);

          this.setState({
            users: data
          });
        }
      });
  };

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else {
          let toFollow = this.state.users;
          toFollow.splice(i, 1);
          this.setState({
            users: toFollow,
            open: true,
            followMessage: `Following ${user.name}`
          });
        }
      });
  };

  renderUsers = users => (
    <div className="row">
      {users.map((user, i) => (
        <div className="card col-md-4 col-log-4" key={i}>
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail img-fluid"
            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
            onError={i => (i.target.src = `${DefaultProfile}`)}
            alt={user.name}
          />
          <div className="card-body">
            <h5 className="card-header">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <Link
              className="btn btn-raised btn-secondary btn-sm"
              to={`/user/${user._id}`}
            >
              View Profile
            </Link>

            <button
              className="btn btn-raised btn-info float-right"
              onClick={() => {
                this.clickFollow(user, i);
              }}
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users, open, followMessage } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Find People</h2>

        {open && <p className="alert alert-success">{followMessage}</p>}

        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
