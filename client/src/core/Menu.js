import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/index.js';


const isActive = (history, path) =>{
  if(history.location.pathname === path){
    return {color: '#ff9900'}
  }else{
    return {color: "#ffffff"}
  }
}

const Menu = (props) => {
  return(
    <Fragment>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link to="/" className="nav-link" style ={isActive(props.history, '/')}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link" style ={isActive(props.history, '/users')}>users</Link>
        </li>
        {!isAuthenticated()? (<Fragment>
          <li className="nav-item">
            <Link to="/signin" className="nav-link" style ={isActive(props.history, '/signin')}>Signin</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" style ={isActive(props.history, '/signup')}>Signup</Link>
          </li></Fragment>) : (<Fragment>
            <li className="nav-item" >
              <Link className="nav-link" to={`/create/post`} style={isActive(props.history, `/create/post`)}>
                Create Post

              </Link>
            </li>
            <li className="nav-item" >
              <Link className="nav-link" to={`/findpeople`} style={isActive(props.history, `/findpeople`)}>
                Find People

              </Link>
            </li>
            <li className="nav-item" >
              <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`} style={isActive(props.history, `/user/${isAuthenticated().user._id}`)}>
                {isAuthenticated().user.name}'s profile

              </Link>
            </li>
            <li className="nav-item">
            <span
            className="nav-link"
            style ={
              (isActive(props.history, '/signout'),
              { cursor: "pointer", color: "#fff"})
            }
            onClick = { () => signout( () => { props.history.push('/') } ) }
            >Signout</span>
            </li>
            </Fragment>)}


      </ul>
    </Fragment>
  )
}

export default withRouter(Menu);
