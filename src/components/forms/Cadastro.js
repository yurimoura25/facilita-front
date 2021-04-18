import React, { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import {
  Button
} from "react-bootstrap";
import { Card } from "react-bootstrap";
import "../../css/Cadastro.css";
import "../../css/Endereco.css";
import UsuarioForm from './UsuarioForm';
import OngForm from './OngForm';

function RedirectToModal(props) {
  const { userInfo } = useContext(UserContext);
  return userInfo.type === "ong" ? (
    <OngForm show={props.show} onHide={props.onHide} />
  ) : (
    <UsuarioForm show={props.show} onHide={props.onHide} />
  );
}

function Cadastro() {
  const { setOng, setUsuario } = useContext(UserContext);
  const [signUpModal, setSignUpModal] = useState(false);
  const handleModal = () => {
    setSignUpModal(true);
  };

  return (
    <>
      <RedirectToModal
        show={signUpModal}
        onHide={() => setSignUpModal(false)}
      />
      <Card className="card-cadastro">
        <Card.Header className="card-header-cadastro">Usuário</Card.Header>
        <Card.Body>
          <Card.Title>Ajude instituições</Card.Title>
          <Card.Text>
            Ajude a levar esperança para as pessoas em sua região, doe usando
            este website.
          </Card.Text>
          <Button
            variant="primary"
            className="btn-cadastro"
            onClick={() => {
              setUsuario();
              handleModal();
            }}
          >
            Cadastre-se
          </Button>
        </Card.Body>
      </Card>
      <Card className="card-cadastro">
        <Card.Header className="card-header-cadastro">Instituição</Card.Header>
        <Card.Body>
          <Card.Title>Receba ajuda para sua ONG</Card.Title>
          <Card.Text>
            Receba doações para ajudar a sua instituição através desse website
          </Card.Text>
          <Button
            variant="primary"
            className="btn-cadastro"
            onClick={() => {
              setOng();
              handleModal();
            }}
          >
            Cadastre-se
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}


export default Cadastro;
