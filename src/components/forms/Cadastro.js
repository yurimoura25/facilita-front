import React, { useContext, useState } from "react";
import UserContext from '../../contexts/UserContext'
import {Modal, Form, Col, Container, Row, Button} from 'react-bootstrap'
import {Formik, ErrorMessage} from 'formik'
import {Card} from 'react-bootstrap'
import '../../css/Cadastro.css';

function RedirectToModal(props) {
  const {userInfo} = useContext(UserContext);
  return(userInfo.type === 'ong'? (<OngForm show={props.show} onHide={props.onHide}/>) : (<UsuarioForm show={props.show} onHide={props.onHide}/>))
}
function Cadastro() {
  const { setOng, setUsuario } = useContext(UserContext);
  const [signUpModal, setSignUpModal] = useState(false);
  const handleModal =() => { 
    setSignUpModal(true);
  } 

  return ( 
    <>
    <RedirectToModal  show={signUpModal} onHide={() => setSignUpModal(false)} />
        <Card className="card-usuario">
            <Card.Header>Usuário</Card.Header>
            <Card.Body>
                <Card.Title>Ajude instituições</Card.Title>
                <Card.Text>
                    Ajude a levar esperança para as pessoas em sua região, doe usando este website.
                </Card.Text>
                    <Button variant="primary" className="btn-cadastro" onClick={() => {setUsuario(); handleModal()}}>Cadastre-se</Button>

            </Card.Body>
        </Card>
        <Card className="card-ong">
            <Card.Header>Instituição</Card.Header>
            <Card.Body>
            <Card.Title>Receba ajuda para sua ONG</Card.Title>
            <Card.Text>
                Receba doações para ajudar a sua instituição através desse website
            </Card.Text>
                    <Button variant="primary" className="btn-cadastro" onClick={() => {setOng(); handleModal()}}>Cadastre-se</Button>
            </Card.Body>
        </Card>
    </>
);
}

function UsuarioForm(props) {
  return(    
  <Modal
    {...props}
    centered={true}
    aria-labelledby="contained-modal-title-vcenter"
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter" className="padding-0">
        Usuário
  
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="show-grid padding-0">
      <Container>
        <Formik
        initialValues={{nome: "", sobrenome: "", cpf: "", email: '', password: ''}}
        >
          {({values, handleSubmit, isSubmitting}) => ( 
          <Form onSubmit={handleSubmit}>
            <Row className="padding-0">
              <Col xs={12} md={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" value={values.email}/>
                  <ErrorMessage name="email" component="div" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="padding-0">
              <Col xs={12} md={12}>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={values.password}/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="padding-0">
              <Col>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                Sign up
                </Button>
              </Col>
            </Row>
          </Form>
          )}
        </Formik>
      </Container>
    </Modal.Body>
  </Modal>)  
}

function OngForm(props) {
  return( 
    <Modal
      {...props}
      centered={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="padding-0">
          ONG
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid padding-0">
        <Container>
          <Formik
          initialValues={{email: '', password: ''}}
          >
            {({values, handleSubmit, isSubmitting}) => ( 
            <Form onSubmit={handleSubmit}>
              <Row className="padding-0">
                <Col xs={12} md={12}>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="nome" placeholder="Nome" />
                    <ErrorMessage name="nome" component="div" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="padding-0">
                <Col xs={12} md={12}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="padding-0">
                <Col xs={12} md={12}>
                  <Form.Group controlId="formBasicCNPJ">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control type="cnpj" placeholder="CNPJ" />
                    <ErrorMessage name="cnpj" component="div" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="padding-0">
                <Col xs={12} md={12}>
                  <Form.Group controlId="formBasicSenha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="senha" placeholder="Senha" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="padding-0">
                <Col>
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Sign up
                  </Button>
                </Col>
              </Row>
            </Form>
            )}
          </Formik>
        </Container>
      </Modal.Body>
    </Modal>
  );
}


export default Cadastro;