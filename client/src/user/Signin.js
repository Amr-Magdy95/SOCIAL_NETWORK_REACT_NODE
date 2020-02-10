import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth/index.js';

class Signin extends Component{
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
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
    this.setState({
      loading: true
    })
    const {email, password} = this.state;
    const user ={
      email: email,
      password: password
    }
    //console.log(user);
    signin(user)
        .then(data =>{
          if(data.error){
            this.setState({
              error: data.error,
              loading: false
            })
          }
            else{
              //authenticate then redirect
              authenticate(data, ()=>{
                this.setState({ redirectToReferer: true })
              })

            }
        })
  }

  signinForm = (email, password) =>{
    return(
      <form>

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
    const {email, password, error, redirectToReferer, loading} = this.state
    if(redirectToReferer){
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>
        {error? (<div className="alert alert-danger">{error}</div>): null }

        {loading? (<div className="jumbotron text-center">
                    <h2>Loading ...</h2>
        </div>) : null}

        {this.signinForm(email, password)}
      </div>
    )
  }
}

export default Signin;
