import React, { useState } from "react";
import "./css/App.css";
import Home from "./components/pages/Home";
import { UserProvider } from "./contexts/UserContext";
import Cadastro from "./components/forms/Cadastro";
import Login from "./components/forms/Login";
import MapPage from "./components/pages/MapPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import OngList from "./components/list/OngList";

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
									onClick={() => {
										setLogInModal(true);
									}}
								>
									Sign in
								</button>
								<Nav.Link href="/cadastrar">
									<button className="nav-button-item">Sign up</button>
								</Nav.Link>
							</Nav.Item>
						</div>
					</header>
					<main className="text-center">
						<Login show={logInModal} onHide={() => setLogInModal(false)} />
						<Container className="container-content">
							<Row>
								<Col className="col content" xs={12}>
									<Switch>
										<Route exact path="/" component={Home} />
										<Route path="/cadastrar" component={Cadastro} />
										<Route path="/instituicoes" component={MapPage} />
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
