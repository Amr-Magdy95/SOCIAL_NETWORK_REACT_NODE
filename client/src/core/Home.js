import React from "react";
import Posts from "../post/Posts";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-center">
        <h2>Home</h2>
        <p className="lead">Welcome to React Frontend</p>
      </div>
      <Posts />
    </>
  );
};

export default Home;
