import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class ProfileTabs extends Component {
  render() {
    const { followers, following } = this.props;
    return (
      <div>
        <div className="row">
          {/*Followers*/}
          <div className="col-md-4">
            <h3 className="text-primary">{followers.length} Followers</h3>
            <hr />
            {followers.map((person, i) => {
              return (
                <div key={i}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black"
                        }}
                        className="float-left mr-2"
                        height="30px"
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        width="30px"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                      />
                      <div>
                        <p className="leader"> {person.name} </p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Following */}
          <div className="col-md-4">
            <h3 className="text-primary">{following.length} Following</h3>
            <hr />
            {following.map((person, i) => {
              return (
                <div key={i}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black"
                        }}
                        className="float-left mr-2"
                        height="30px"
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        width="30px"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                      />
                      <div>
                        <p className="leader"> {person.name} </p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
