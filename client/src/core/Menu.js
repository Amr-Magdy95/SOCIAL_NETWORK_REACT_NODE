import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) =>{
  if(history.location.pathname === path){
    return {color: '#ff9900'}
  }else{
    return {color: "#ffffff"}
  }
}

export const signout = (next) => {
  if(typeof window !== 'undefined') localStorage.removeItem('jwt')
  next()
  return fetch("http:/localhost:8080/signout", {
    method: "GET",
  })
  .then( (response) => {
    console.log('signout', response)
    return response.json()
  })
  .catch(err => {
    console.log(err)
  })
}

export const isAuthenticated = () =>{
  if(typeof window !== "undefined"){
    const token = localStorage.getItem('jwt');
    if(token){
      return JSON.parse(token);
    }else{
      return false;
    }
  }
  else{
    return false;
  }
}

const Menu = (props) => {
  return(
    <Fragment>
      <ul className="nav nav-tabs bg-primary">
        <li class="nav-item">
          <Link to="/" className="nav-link" style ={isActive(props.history, '/')}>Home</Link>
        </li>
        {!isAuthenticated()? (<Fragment>
          <li class="nav-item">
            <Link to="/signin" className="nav-link" style ={isActive(props.history, '/signin')}>Signin</Link>
          </li>
          <li class="nav-item">
            <Link to="/signup" className="nav-link" style ={isActive(props.history, '/signup')}>Signup</Link>
          </li></Fragment>) : (<Fragment>
            <li class="nav-item">
              <a
              className="nav-link"
              style ={
                (isActive(props.history, '/signout'),
                { cursor: "pointer", color: "#fff"})
              }
              onClick = { () => signout( () => { props.history.push('/') } ) }
              >Signout</a>
            </li>
            <li class="nav-item">
              <a
              className="nav-link"
              >{isAuthenticated().user.name}</a>
            </li>
            </Fragment>)}


      </ul>
    </Fragment>
  )
}

export default withRouter(Menu);
