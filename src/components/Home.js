import React, { useContext } from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import {Card, Button, Container, CardGroup} from 'react-bootstrap'

function Home() {
  const { setOng, setUsuario } = useContext(UserContext);

  return (
    <div className="home">
        <Container className="home-container">
        <CardGroup>
            <Card>
                <Card.Header>Usuário</Card.Header>
                <Card.Body>
                    <Card.Title>Ajude instituições</Card.Title>
                    <Card.Text>
                        Ajude a levar esperança para as pessoas em sua região, doe usando este website.
                    </Card.Text>
                    <Link to="/cadastrar">
                        <Button variant="primary" className="btn-cadastro" onClick={() => setUsuario()}>Cadastre-se</Button>
                    </Link>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Instituição</Card.Header>
                <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional
                    content.
                </Card.Text>
                <Link to="/cadastrar">
                        <Button variant="primary" className="btn-cadastro" onClick={() => setOng()}>Cadastre-se</Button>
                </Link>
                </Card.Body>
            </Card>
        </CardGroup>
        </Container>
    </div>
  );
}

export default Home;
