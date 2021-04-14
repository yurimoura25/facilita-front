import React from "react";
import "./css/Home.css";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="page container-fluid">
          <div className="header row align-items-center">
            <div className="col-lg-2 col" id="logo">
              <img
                alt="Logo do site"
                src={`${process.env.PUBLIC_URL}/img/logo.svg`}
              />
            </div>
            <div className="col-lg-10 col justify-content-end">
              <h1>Login</h1>
              <h1>Cadastrar</h1>
            </div>
          </div>
          <div className="content row">
            <div class="col-sm-8"> </div>
            <div class="login-cadastro col-sm-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
