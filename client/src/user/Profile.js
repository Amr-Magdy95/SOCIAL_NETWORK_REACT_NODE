import React from 'react';
import { isAuthenticated } from '../auth/index.js';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser.js';
import DefaultProfile from "../images/avatar.jpg";
import DeleteUser from './DeleteUser';


class Profile extends React.Component{
  constructor(){
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    }
  }

  init = (userId) =>{
    const token = isAuthenticated().token
    read(userId, token)
    .then(response => {
      return response.json();
    })
    .then( data => {
      if(data.error){
        this.setState({ redirectToSignin: true })
      }else{
        this.setState({
          user: data
        })
      }
    })

  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }
  render(){
    const user = isAuthenticated().user
    const redirectToSignin = this.state.redirectToSignin
    const photoUrl = this.state.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.user._id}?${new Date().getTime()}`: DefaultProfile;

    if( redirectToSignin ){
      return <Redirect to="/signin" />
    }
    return(
      <div className="container">
        <h2 className="mt-4 mb-5">Profile</h2>
        <div className="row">
            <div className="col-md-6">

              <img
                style={{height: "200px", width: 'auto', borderRadius: "10px"}}
                className= "img-thumbnail"
                src={photoUrl}
                onError={i => (i.target.src = `${DefaultProfile}`)}
                alt={this.state.name}
              />

            </div>
            <div className="col-md-6 mt-5">

            {
              user &&
              <div className="lead ml-3">
              <p>Hello {this.state.user.name}</p>
              <p>Email: {this.state.user.email}</p>
              <p>{`Joined ${new Date(this.state.user.created).toDateString()}`}</p>
              </div>

            }
            {
              user &&
              user._id == this.state.user._id &&
              <div className ="d-inline-block mt-5">
              <Link
              className="btn btn-raised btn-success mr-5"
              to={`/user/edit/${this.state.user._id}`}
              >Edit Profile</Link>
              <DeleteUser  userId={this.state.user._id}/>
              </div>
            }

            </div>
        </div>

        <div className="row">

          <div className="col-md-12 mb-5 mt-5 lead"><hr />{this.state.user.about} <hr /></div>

        </div>
      </div>
    )
  }
}

export default Profile;
