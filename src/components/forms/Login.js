import {Button, Container, Col, Form, Modal, Row} from 'react-bootstrap'

function Login(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Entre em Facilita
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="show-grid">
      <Container>
        <Form>
        <Row>
          <Col xs={12} md={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
            <Button variant="primary" type="submit">
            Log in
            </Button>
        </Row>
        </Form>
      </Container>
    </Modal.Body>
  </Modal>
)
}

export default Login;