import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import FindPeople from './user/FindPeople';
import EditProfile from './user/EditProfile';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import Users from './user/Users';
import Menu from './core/Menu'
import PrivateRoute from './auth/PrivateRoute';
import EditPost from './post/EditPost';

const MainRouter = () =>{
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/create/post" component={NewPost} />
        <Route exact path="/post/:postId" component={SinglePost} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/user/:userId" component={Profile} />
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
        <PrivateRoute exact path="/findpeople" component={FindPeople} />
        <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />

      </Switch>
    </div>
  )
}

export default MainRouter;
