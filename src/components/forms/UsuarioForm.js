import React from "react";
import { Modal, Form, Col, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";

//Redux
import usuarioFilter from "../../redux/filters/UsuarioFilter"
import {salvarUsuario} from "../../redux/actions/UsuarioAction"
import {connect} from "react-redux";


import "../../css/Cadastro.css";
import "../../css/Endereco.css";
import * as Yup from "yup";


const endereco = {
	cep: "",
	estado: "",
	cidade: "",
	bairro: "",
	rua: "",
	numero: "",
	complemento: "",
};

function UsuarioForm(props) {
	const history = useHistory();
	const signUpSchema = Yup.object().shape({
		nome: Yup.string()
		.matches(/^[a-z ]+$/i, "Apenas letras")
		.min(2, "Muito curto")
		.max(60, "Muito longo")
		.required("Obrigatório"),
		email: Yup.string().email().max(60, "Muito longo").required("Obrigatório"),
		senha: Yup.string()
		.matches(/^(?=.{6,})/, "Deve conter pelo menos 6 caracteres")
		.required("Obrigatório"),
		cpf: Yup.string()
			.matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Apenas números")
			.min(11, "Deve conter 11 dígitos")
			.max(11, "Deve conter 11 dígitos"),
	});
	return (
		<Modal
			{...props}
			centered={true}
			aria-labelledby="contained-modal-title-vcenter"
			className="modal-cadastro-usuario"
			contentClassName="modal-content-cadastrar-usuario"
		>
			<Modal.Header className="modal-header-cadastro-usuario" closeButton>
				<Modal.Title id="contained-modal-title-vcenter" className="padding-0">
					<img
						id="logo-login"
						alt="logo do site"
						src={`${process.env.PUBLIC_URL}/img/logo.svg`}
						style={{ display: "inline-block", whiteSpace: "nowrap" }}
					/>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="modal-body-cadastro-usuario show-grid padding-0">
				<Container>
					<Formik
						enableReinitialize
						initialValues={{
							nome: "",
							sobrenome: "",
							cpf: "",
							email: "",
							senha: "",
						}}
						validationSchema={signUpSchema}
						onSubmit={(fields) => {
							props.onHide();
							props.salvarUsuario({
								instituicao: {
									nome: fields.nome.concat(" " + fields.sobrenome).trim(),
									cpf: fields.cpf,
									email: fields.email,
									senha: fields.senha
								},
								endereco: [{}]
							});
							history.push("/instituicoes");
							console.log(fields);
						}}
					>
						{({ values, handleSubmit, isSubmitting }) => (
							<Form onSubmit={handleSubmit}>
								<h1 className="titulo-cadastro">Cadastro Usuário</h1>
								<Form.Row className="padding-0">
									<Col>
										<Form.Group controlId="formBasicNome">
											<Field
												className="form-control"
												name="nome"
												type="text"
												placeholder="Nome"
											/>
											<ErrorMessage
												className="error-message"
												name="nome"
												component="div"
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId="formBasicSobrenome">
											<Field
												className="form-control"
												name="sobrenome"
												type="text"
												placeholder="Sobrenome"
											/>
											<ErrorMessage
												className="error-message"
												name="sobrenome"
												component="div"
										
											/>
										</Form.Group>
									</Col>
								</Form.Row>
								<Form.Row className="padding-0">
									<Col xs={12} md={12}>
										<Form.Group controlId="formBasicCPF">
											<Field
												className="form-control cpf"
												name="cpf"
												type="text"
												placeholder="CPF"
											/>
											<ErrorMessage
												className="error-message"
												name="cpf"
												component="div"
											/>
										</Form.Group>
									</Col>
								</Form.Row>
								<Form.Row className="padding-0">
									<Col xs={12} md={12}>
										<Form.Group controlId="formBasicEmail">
											<Field
												className="form-control"
												name="email"
												type="text"
												placeholder="Email"
											/>
											<ErrorMessage
												className="error-message"
												name="email"
												component="div"
											/>
										</Form.Group>
									</Col>
								</Form.Row>
								<Form.Row className="padding-0">
									<Col xs={12} md={12}>
										<Form.Group controlId="formBasicPassword">
											<Field
												className="form-control"
												name="senha"
												type="password"
												placeholder="Senha"
											/>
											<ErrorMessage
												className="error-message"
												name="senha"
												component="div"
											/>
										</Form.Group>
									</Col>
								</Form.Row>
								<Form.Row className="padding-0">
									<Col>
										<button
											className="cadastro-button"
											type="submit"
											disabled={isSubmitting}
										>
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

export default connect(usuarioFilter, {salvarUsuario}) (UsuarioForm); 