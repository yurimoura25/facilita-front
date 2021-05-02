import { Container, Col, Form, Modal } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../css/Login.css";
import { useHistory } from "react-router-dom";

function Login(props) {
	const history = useHistory();
	const loginSchema = Yup.object().shape({
		email: Yup.string().email().max(60, "Muito longo").required("Obrigatório"),
		password: Yup.string()
			.matches(/^(?=.{6,})/, "Deve conter pelo menos 6 caracteres")
			.required("Obrigatório"),
	});

	return (
		<Modal
			contentClassName="modal-content-login"
			className="modal-login"
			{...props}
			centered={true}
			aria-labelledby="contained-modal-title-vcenter"
		>
			<Modal.Header className="modal-header-login" closeButton>
				<Modal.Title
					id="contained-modal-title-vcenter"
					className="modal-title-login"
				>
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
						enableReinitialize
						initialValues={{ email: "", password: "" }}
						validationSchema={loginSchema}
						onSubmit={(fields) => {
							props.onHide();
							history.push("/instituicoes");
							console.log(fields);
						}}
					>
						{({ values, handleSubmit, isSubmitting }) => (
							<Form onSubmit={handleSubmit}>
								<h1 className="titulo">Login</h1>
								<Form.Row className="padding-0">
									<Col xs={12} md={12}>
										<Form.Group controlId="formBasicEmail">
											<Field
												className="form-control"
												name="email"
												type="text"
												placeholder="Email"
											/>
											<ErrorMessage name="email" component="div" />
										</Form.Group>
									</Col>
								</Form.Row>

								<Form.Row className="padding-0">
									<Col xs={12} md={12}>
										<Form.Group controlId="formBasicPassword">
											<Field
												className="form-control"
												name="password"
												type="password"
												placeholder="Senha"
											/>
											<ErrorMessage
												className="error-message"
												name="password"
												component="div"
											/>
										</Form.Group>
									</Col>
								</Form.Row>
								<Form.Row className="padding-0">
									<Col>
										<button
											className="signin-button"
											type="submit"
											disabled={isSubmitting}
										>
											Entrar
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

export default Login;
