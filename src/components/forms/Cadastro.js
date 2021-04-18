import React, { useContext, useState } from "react";
import UserContext from '../../contexts/UserContext'
import {Modal, Form, Col, Container, Button} from 'react-bootstrap'
import {Formik, Field, ErrorMessage} from 'formik'
import {Card} from 'react-bootstrap'
import '../../css/Cadastro.css';
import *  as Yup from 'yup';

const defaultSchema = {
  nome: Yup.string()
  .matches(/^[a-z ]+$/i, 'Apenas letras')
  .min(2, 'Muito curto')
  .max(60, 'Muito longo')
  .required('Obrigatório'),
  email: Yup.string()
  .email()
  .max(60, 'Muito longo')
  .required('Obrigatório'),
  password: Yup.string()
  .matches(/^(?=.{6,})/, 'Deve conter pelo menos 6 caracteres')
  .required('Obrigatório')
}

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
  const signUpSchema = Yup.object().shape({
    ...defaultSchema,
    sobrenome: Yup.string()
    .matches(/^[a-z]+$/i, 'Apenas letras')
    .min(2, 'Muito curto')
    .max(60, 'Muito longo')
    .required('Obrigatório'),
    cpf: Yup.string()
    .matches(/^[0-9]+$/, 'Apenas números')
    .min(11, 'Deve conter 11 dígitos')
    .max(11, 'Deve conter 11 dígitos')

  })
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
        enableReinitialize
        initialValues={{nome: "", sobrenome: "", cpf: "", email: '', password: ''}}
        validationSchema={signUpSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
        >
          {({values, handleSubmit, isSubmitting}) => ( 
          <Form onSubmit={handleSubmit}>
            <h1 className="titulo-cadastro">Cadastro Usuário</h1>
              <Form.Row className="padding-0">
              <Col>
                <Form.Group controlId="formBasicNome">
                  <Field className="form-control" name="nome" type="text" placeholder="Nome"/>
                  <ErrorMessage className="error-message" name="nome" component="div" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicSobrenome">
                <Field className="form-control" name="sobrenome"type="text" placeholder="Sobrenome"/>
                <ErrorMessage className="error-message" name="sobrenome" component="div" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="padding-0">
              <Col xs={12} md={12}>
                <Form.Group controlId="formBasicCPF">
                  <Field className="form-control"
                  name="cpf" 
                  type="text" 
                  placeholder="CPF" 
                  />
                  <ErrorMessage className="error-message" name="cpf" component="div" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="padding-0">
              <Col xs={12} md={12}>
                <Form.Group controlId="formBasicEmail">
                  <Field className="form-control" name="email" type="text" placeholder="Email" />
                  <ErrorMessage className="error-message" name="email" component="div" />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="padding-0">
              <Col xs={12} md={12}>
                <Form.Group controlId="formBasicPassword">
                <Field className="form-control" name="password" type="password" placeholder="Senha" />
                <ErrorMessage className="error-message" name="password" component="div" />
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
  const signUpSchema = Yup.object().shape({
    ...defaultSchema,
    cnpj: Yup.string()
    .matches(/^[0-9]+$/, 'Apenas números')
    .min(14, 'Deve conter 14 dígitos')
    .max(14, 'Deve conter 14 dígitos')
    .required('Obrigatório'),


  })
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
          validationSchema={signUpSchema}
          enableReinitialize
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
          >
            {({values, handleSubmit, isSubmitting}) => ( 
            <Form onSubmit={handleSubmit}>
              <h1 className="titulo-cadastro">Cadastro Ong</h1>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formBasicName">
                    <Field className="form-control" name="nome" type="text" placeholder="Razão Social" />
                    <ErrorMessage className="error-message" name="nome" component="div" />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formBasicCNPJ">
                    <Field className="form-control" name="cnpj" type="text" placeholder="CNPJ" />
                    <ErrorMessage className="error-message" name="cnpj" component="div" />
                  </Form.Group>
                </Col>
                
                </Form.Row>
                <Form.Row>
                
                </Form.Row>
                <Form.Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Field className="form-control" name="email" type="email" placeholder="Email" />
                    <ErrorMessage className="error-message" name="email" component="div" />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formBasicSenha">
                    <Field className="form-control" name="password" type="password" placeholder="Senha" />
                    <ErrorMessage className="error-message" name="password" component="div" />
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