import React, {useContext, useState} from "react";
import "./css/App.css";
import Home from "./components/Home"
import {UserProvider} from './contexts/UserContext'
import Cadastro from './components/forms/Cadastro';
import Login from './components/forms/Login';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Container, Button, Row, Col, Nav} from 'react-bootstrap'

function App() {
  const [logInModal, setLogInModal] = useState(false);

  return (
  <UserProvider>
      <div className="App">
          <Router>
            <header>
              <Container className="header">
                <Row>
                  <Col className="col" xs lg="2">
                    <img
                      id="logo"
                      alt="logo do site"
                      src={`${process.env.PUBLIC_URL}/img/logo.svg`}
                    />
                  </Col>
                  <Col className="col" xs lg="auto">
                    <Nav>
                      <Nav.Item >
                        <Nav.Link href="/" >Home</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Button variant="dark" onClick={() => {setLogInModal(true)}}>Log in</Button>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
              </Container>
            </header>
            <main className="content text-center">
              <Login show={logInModal} onHide={() => setLogInModal(false)}/>
              <Container>
                <Row>
                  <Col className="col" xs={12}>
                    <Switch>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route path="/cadastrar"><Cadastro/></Route>
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
                  <Col className="col">Facilita © - Todos direitos reservados 2021</Col>
                </Row>
              </Container>
            </footer>
          </Router>
      </div>
  </UserProvider>
  );
}


export default App;


             