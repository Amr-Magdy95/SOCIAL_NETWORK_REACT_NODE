import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow);
  };

  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };

  render() {
    return (
      <div className="d-inline-block mt-5">
        {this.props.following ? (
          <button
            className="btn btn-warning btn-raised"
            onClick={this.unfollowClick}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="btn btn-info btn-raised mr-5"
            onClick={this.followClick}
          >
            Follow
          </button>
        )}
      </div>
    );
  }
}

export default FollowProfileButton;
