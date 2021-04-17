import { Button, Container, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import "../../css/Login.css";

function Login(props) {
  return (
    <Modal
      contentClassName="modal-content-login"
      className = "modal-login"
      {...props}
      centered={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className = "modal-header-login"closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="modal-title-login">
          <img
           id="logo-login"
            alt="logo do site"
            src={`${process.env.PUBLIC_URL}/img/logo.svg`}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid modal-body-login">
        <Container>
          <Formik
          initialValues={{email: '', password: ''}}
          >
            {({values, handleSubmit, isSubmitting}) => ( 
            <Form onSubmit={handleSubmit}>
              <h1 className="titulo">Login</h1>
              <Row className="padding-0">
                <Col xs={12} md={12}>
                  <Form.Group controlId="formBasicEmail">
                    {/* <Form.Label>Email</Form.Label> */}
                    <Form.Control type="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="padding-0">
                <Col xs={12} md={12}>
                  <Form.Group controlId="formBasicPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="padding-0">
                <Col>
                  <button className="signin-button" type="submit" disabled={isSubmitting}>
                    Entrar
                  </button>
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

export default Login;
