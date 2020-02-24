import React, { Component, Fragment} from 'react';
import { isAuthenticated } from '../auth/index.js';
import { remove } from './apiUser';
import { signout } from '../auth';
import { Redirect } from 'react-router-dom';


class DeleteUser extends Component{
  state = {
      redirect: false
  }

  deleteAccount = () =>{
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    console.log(`Delete User ${isAuthenticated()}`)
    remove(userId, token)
    .then( response => {
      return response.json()
    })
    .then( data =>{
      if(data.error){
        console.log(data.error)
      }else{
        // signout
        console.log(`DeleteUser Successfully signout `)
        signout( () => console.log("User is deleted"))
        // redirect
        this.setState({
          redirect: true
        })
      }
    })
  }

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your profile")
    if(answer){
      this.deleteAccount();
    }
  }

  render(){
    if(this.state.redirect){
      return <Redirect to="/" />
    }
    return(
      <Fragment>
        <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
        Delete User
        </button>
      </Fragment>
    )
  }
}

export default DeleteUser;
