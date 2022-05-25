import React from "react";
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h1 className="display-4">React ContextAPI - JWT authentication</h1>
        <p className="lead">
          It is a demonstration of how to integrate React/ContextAPI,
          <br />
          NodeJS and JWT authentication to create a fully functional web application.
        </p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/login" role="button">
            Get Started
          </Link>
        </p>
      </div>

      <p></p>
    </div>
  );
}

export default Home;
