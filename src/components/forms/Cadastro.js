import React, { useContext, useState } from "react";
import UserContext from '../../contexts/UserContext'
import {Modal, Form, Col, Container, Row, Button} from 'react-bootstrap'
import {Formik, ErrorMessage} from 'formik'
import {Card} from 'react-bootstrap'
import '../../css/Cadastro.css';

function RedirectToModal(props) {
  const {userInfo} = useContext(UserContext);
  return(userInfo.type === 'ong'? 
  (<OngForm show={props.show} onHide={props.onHide}/>) : 
  (<UsuarioForm show={props.show} onHide={props.onHide}/>))
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
        <Card className="card-cadastro">
            <Card.Header className="card-header-cadastro">Usuário</Card.Header>
            <Card.Body>
                <Card.Title>Ajude instituições</Card.Title>
                <Card.Text>
                    Ajude a levar esperança para as pessoas em sua região, doe usando este website.
                </Card.Text>
                    <Button variant="primary" className="btn-cadastro" onClick={() => {setUsuario(); handleModal()}}>Cadastre-se</Button>

            </Card.Body>
        </Card>
        <Card className="card-cadastro">
            <Card.Header className="card-header-cadastro">Instituição</Card.Header>
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
    className="modal-cadastro-usuario"
    contentClassName="modal-content-cadastrar-usuario"
  >
    <Modal.Header className="modal-header-cadastro-usuario"closeButton>
      <Modal.Title id="contained-modal-title-vcenter" className="padding-0">
        <img
          id="logo-login"
          alt="logo do site"
          src={`${process.env.PUBLIC_URL}/img/logo.svg`}
          style={{display: 'inline-block', whiteSpace: 'nowrap'}}
        />
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="modal-body-cadastro-usuario show-grid padding-0">
      <Container>
        <Formik
        initialValues={{nome: "", sobrenome: "", cpf: "", email: '', password: ''}}
        >
          {({values, handleSubmit, isSubmitting}) => ( 
          <Form onSubmit={handleSubmit}>
            <h1 className="titulo-cadastro">Cadastro Usuário</h1>
              <Form.Row className="padding-0">
              <Col>
                <Form.Group controlId="formBasicNome">
                  <Form.Control type="text" placeholder="Nome"/>
                  <ErrorMessage name="nome" component="div" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicSobrenome">
                <Form.Control type="text" placeholder="Sobrenome"/>
                <ErrorMessage name="sobrenome" component="div" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="padding-0">
              <Col xs={12} md={12}>
                <Form.Group controlId="formBasicCPF">
                  <Form.Control type="text" placeholder="CPF" />
                  <ErrorMessage name="cpf" component="div" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="padding-0">
              <Col xs={12} md={12}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Email" />
                  <ErrorMessage name="email" component="div" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="padding-0">
              <Col xs={12} md={12}>
                <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="padding-0">
              <Col>
                <button className="cadastro-button" type="submit" disabled={isSubmitting}>
                Sign up
                </button>
              </Col>
            </Form.Row>
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
      className="modal-cadastro-ong"
      contentClassName="modal-content-cadastrar-ong"
      {...props}
      centered={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton className="modal-header-cadastro-ong">
        <Modal.Title id="contained-modal-title-vcenter" className="modal-title-cadastro">
        <img
          id="logo-login"
          alt="logo do site"
          src={`${process.env.PUBLIC_URL}/img/logo.svg`}
          style={{display: 'inline-block', whiteSpace: 'nowrap'}}
        />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid modal-body-cadastro-ong">
        <Container>
          <Formik
          initialValues={{nome: '', cnpj: '', email: '', password: ''}}
          >
            {({values, handleSubmit, isSubmitting}) => ( 
            <Form onSubmit={handleSubmit}>
              <h1 className="titulo-cadastro">Cadastro Ong</h1>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formBasicName">
                    <Form.Control type="nome" placeholder="Razão Social" />
                    <ErrorMessage name="nome" component="div" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formBasicCNPJ">
                    <Form.Control type="cnpj" placeholder="CNPJ" />
                    <ErrorMessage name="cnpj" component="div" />
                  </Form.Group>
                </Col>
                
                </Form.Row>
                <Form.Row>
                
                </Form.Row>
                <Form.Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formBasicSenha">
                    <Form.Control type="password" placeholder="Senha" />
                  </Form.Group>
                </Col>

              </Form.Row>

              {/* <Row>
                
              </Row> */}
              <Form.Row>
                <Col>
                  <button className="cadastro-button" type="submit" disabled={isSubmitting}>
                    Sign up
                  </button>
                </Col>
              </Form.Row>
            </Form>
            )}
          </Formik>
        </Container>
      </Modal.Body>
    </Modal>
  );
}


export default Cadastro;