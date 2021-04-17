import React, { useState } from "react";
import "./css/App.css";
import Home from "./components/Home";
import { UserProvider } from "./contexts/UserContext";
import Cadastro from "./components/forms/Cadastro";
import Login from "./components/forms/Login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Button, Row, Col, Nav } from "react-bootstrap";

function App() {
  const [logInModal, setLogInModal] = useState(false);

  return (
    <UserProvider>
      <div className="App">
        <Router>
          <header className="header">
            <div>
              <Nav.Link href="/">
                <img
                  id="logo"
                  alt="logo do site"
                  src={`${process.env.PUBLIC_URL}/img/logo.svg`}
                />
              </Nav.Link>   
            </div>
            <div>
            <Nav.Item className="nav-buttons">
              <button
                className="nav-button-item"
                onClick={()=>{
                  setLogInModal(true);
                }}  
              >
                Sign in
              </button>
              <Nav.Link href="/cadastrar">
                <button
                  className="nav-button-item"
                  >
                    Sign up
                </button>
              </Nav.Link>
            </Nav.Item>
            </div>
          </header>
          <main className="text-center">
            <Login show={logInModal} onHide={() => setLogInModal(false)} />
            <Container>
              <Row>
                <Col className="col" xs={12} className="content">
                  <Switch>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/cadastrar">
                      <Cadastro />
                    </Route>
                    <Route path="*">
                      <div>Not Found 404</div>
                    </Route>
                  </Switch>
                </Col>
              </Row>
            </Container>
          </main>
          <footer>
            <Container>
              <Row className="align-items-end text-center">
                <Col className="footer">
                  Facilita © - Todos direitos reservados 2021
                </Col>
              </Row>
            </Container>
          </footer>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
