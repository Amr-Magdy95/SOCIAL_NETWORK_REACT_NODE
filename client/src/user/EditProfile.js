import React from 'react';
import { isAuthenticated } from '../auth/index.js';
import { read, update, updateUser } from './apiUser.js';
import { Redirect } from 'react-router-dom';
import DefaultProfile from "../images/avatar.jpg";



class EditProfile extends React.Component{
  constructor(){
    super()
    this.state = {
      id: "",
      name: "",
      email:"",
      password: "",
      redirectToProfile: false,
      error: "",
      loading: false,
      fileSize: 0,
      about: ""
    }
  }

  handleChange = (prop) => (event) =>{
    const value = prop === 'photo'? event.target.files[0] : event.target.value
    const fileSize = prop === 'photo'? event.target.files[0].size : 0;
    this.userData.set(prop, value)
    this.setState({[prop]: value, fileSize: fileSize})
  }

  clickSubmit = (event) =>{
    event.preventDefault();
    this.setState({ loading: true })

    if(this.isValid()){
      const token = isAuthenticated().token
      const userId = this.props.match.params.userId;
      update(userId, token, this.userData)
      .then( response =>{
        return response.json();
      })
      .then( data => {
        if(data.error) this.setState({ error: data.error});
        else{
          updateUser(data, () =>{
            this.setState({
              redirectToProfile: true
            })
          })
        }
      })


    }

  }

  signupForm = (name, email, password, about) =>{
    return(
      <form>
        <div className="form-group">
          <label className="text-muted">Profile Photo</label>
          <input
            onChange={this.handleChange("photo")}
            type="file"
            accept = "image/*"
            className="form-control"
             />
        </div>
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
        <div className="form-group">
          <label className="text-muted">About</label>
          <input
            onChange={this.handleChange("about")}
            type="text"
            className="form-control"
            value = {about}
          />
        </div>
        <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Update</button>
      </form>
    )
  }

  init = (userId) =>{
    const token = isAuthenticated().token
    read(userId, token)
    .then(response => {
      return response.json();
    })
    .then( data => {
      if(data.error){
        this.setState({ redirectToProfile: true })
      }else{
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about
        })
      }
    })
  }

  isValid = () =>{
    const { name, email, password, fileSize } = this.state;
    if(name.length === 0 ){
      this.setState({error: "Name is required", loading: false})
      return false;
    }

    if( fileSize > 100000){
      this.setState({error: "Image size should be less than 100kb"})
      return false;
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
      this.setState({error: "Universal email format must be met", loading: false})
      return false;
    }

    if(password.length >= 1 && password.length <=5 ){
      this.setState({error: "password must be at least 6 characters long", loading: false})
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.userData = new FormData()
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  render(){
    const { redirectToProfile, id, error, loading } = this.state;
    const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`: DefaultProfile;

    if( redirectToProfile){
      return <Redirect to={ `/user/${id}` } />
    }

    return(
      <div className= "container">
      <h2 className="mt-5 mb-5">Edit Profile</h2>
      {loading? (<div className="jumbotron text-center">
                  <h2>Loading ...</h2>
      </div>) : null}
      {error? (<div className="alert alert-danger">{error}</div>): null }

      <img
        style={{height: "200px", width: 'auto', borderRadius: "10px"}}
        className= "img-thumbnail"
        src={photoUrl}
        alt={this.state.name}
        onError={i => (i.target.src = `${DefaultProfile}`)}
      />
      {this.signupForm(this.state.name, this.state.email, this.state.password, this.state.about)}

      </div>
    )
  }
}

export default EditProfile;
