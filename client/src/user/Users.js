import React, { Component } from 'react';
import { list } from './apiUser';
import { Link } from 'react-router-dom';
import DefaultProfile from "../images/avatar.jpg";

class User extends Component{
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount = () =>{
    list()
    .then( response => {
      return response.json()
    })
    .then(data =>{
      if(data.error){
        console.log(data.error)
      }else{
        this.setState({
          users: data
        })
      }
    })
  }

  renderUsers = (users) => (
      <div className= "row">
        {users.map( (user, i) =>(
          <div className="card col-md-4 col-log-4" key={i}>
          <img
                      style={{ height: "200px", width: "auto" }}
                      className="img-thumbnail img-fluid"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${
                          user._id
                      }`}
                      onError={i => (i.target.src = `${DefaultProfile}`)}
                      alt={user.name}
                  />
            <div className="card-body">
              <h5 className="card-header">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                className="btn btn-raised btn-secondary btn-sm"
                to={`/user/${user._id}`}
                >View Profile</Link>
            </div>
          </div>
        ))}
      </div>
  )

  render(){
    const { users } = this.state;
    return(
      <div className="container" >
        <h2 className="mt-5 mb-5">Users</h2>

        {this.renderUsers(users)}
      </div>
    )
  }
}

export default User
