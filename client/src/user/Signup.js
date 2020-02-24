import React, { Component } from 'react';
import { signup } from '../auth/index.js';
import {Link} from 'react-router-dom';

class Signup extends Component{
  constructor(props){
    super(props);
    this.state={
      name: "",
      email: "",
      password: "",
      error: "",
      success: false
    }
  }

  handleChange = (prop) => (event) =>{
    this.setState({
      error: "",
      success: false
    })
    this.setState({[prop]: event.target.value})
  }

  clickSubmit = (event) =>{
    event.preventDefault();
    const {name, email, password} = this.state;
    const user ={
      name: name,
      email: email,
      password: password
    }
    //console.log(user);
    signup(user)
        .then(data =>{
          if(data.error){
            this.setState({
              error: data.error
            })}
            else{
              this.setState({
                error: "",
                name: "",
                email: "",
                password: "",
                success: true
              })
            }
        })
  }

  signupForm = (name, email, password) =>{
    return(
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={this.handleChange("name")}
            type="text"
            className="form-control"
            value = {name}
             />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value = {email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value = {password}
          />
        </div>
        <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Submit</button>
      </form>
    )
  }

  render() {
    const { name, email, password, error, success} = this.state
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        {error? (<div className="alert alert-danger">{error}</div>): null }
        {success? (<div className="alert alert-info">Signup Successful! Please <Link to="/signin">Sign in</Link></div>): null }

        {this.signupForm(name, email, password)}
      </div>
    )
  }
}

export default Signup;
