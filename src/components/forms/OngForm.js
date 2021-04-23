import React, { useState } from "react";
import { Modal, Form, Col, Container, Tabs, Tab } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import "../../css/Cadastro.css";
import "../../css/Endereco.css";
import OngService from "../../services/OngService";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const defaultSchema = {
	nome: Yup.string()
		.matches(/^[a-z ]+$/i, "Apenas letras")
		.min(2, "Muito curto")
		.max(60, "Muito longo")
		.required("Obrigatório"),
	email: Yup.string().email().max(60, "Muito longo").required("Obrigatório"),
	password: Yup.string()
		.matches(/^(?=.{6,})/, "Deve conter pelo menos 6 caracteres")
		.required("Obrigatório"),
};

const endereco = {
	cep: "",
	estado: "",
	cidade: "",
	bairro: "",
	rua: "",
	numero: "",
	complemento: "",
};

function OngForm(props) {
	const [key, setKey] = useState("ongInfo");
	const history = useHistory();

	const signUpSchema = Yup.object().shape({
		...defaultSchema,
		cnpj: Yup.string()
			.matches(/^[0-9]+$/, "Apenas números")
			.min(14, "Deve conter 14 dígitos")
			.max(14, "Deve conter 14 dígitos")
			.required("Obrigatório"),
	});
	return (
		<Modal
			className="modal-cadastro-ong"
			contentClassName="modal-content-cadastrar-ong"
			{...props}
			centered={true}
			aria-labelledby="contained-modal-title-vcenter"
		>
			<Modal.Header closeButton className="modal-header-cadastro-ong">
				<Modal.Title
					id="contained-modal-title-vcenter"
					className="modal-title-cadastro"
				>
					<img
						id="logo-login"
						alt="logo do site"
						src={`${process.env.PUBLIC_URL}/img/logo.svg`}
						style={{ display: "inline-block", whiteSpace: "nowrap" }}
					/>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="show-grid modal-body-cadastro-ong">
				{/* CEP, ESTADO, CIDADE, BAIRRO, RUA, NUMERO, COMPLEMENTO, principal */}
				<Container>
					<Formik
						initialValues={{
							nome: "",
							cnpj: "",
							email: "",
							password: "",
							...endereco,
						}}
						validationSchema={signUpSchema}
						enableReinitialize
						onSubmit={(fields) => {
							props.onHide();
							history.push("/lista");
						}}
					>
						{({ values, handleSubmit, isSubmitting }) => (
							<Form onSubmit={handleSubmit}>
								<Tabs id="cadastro" activeKey={key} onSelect={(k) => setKey(k)}>
									<Tab
										eventKey="ongInfo"
										title="ONG"
										tabClassName="cadastro-tab"
									>
										<Form.Row>
											<Col>
												<Form.Group controlId="formBasicName">
													<Field
														className="form-control"
														name="nome"
														type="text"
														placeholder="Razão Social"
													/>
													<ErrorMessage
														className="error-message"
														name="nome"
														component="div"
													/>
												</Form.Group>
											</Col>

											<Col>
												<Form.Group controlId="formBasicCNPJ">
													<Field
														className="form-control"
														name="cnpj"
														type="text"
														placeholder="CNPJ"
													/>
													<ErrorMessage
														className="error-message"
														name="cnpj"
														component="div"
													/>
												</Form.Group>
											</Col>
										</Form.Row>
										<Form.Row>
											<Col>
												<Form.Group controlId="formBasicEmail">
													<Field
														className="form-control"
														name="email"
														type="email"
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
										<Form.Row>
											<Col>
												<Form.Group controlId="formBasicSenha">
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
										<Form.Row>
											<Col>
												<button
													className="cadastro-button"
													onClick={() => setKey("endereco")}
													type="button"
												>
													Cadastrar Endereço
												</button>
											</Col>
										</Form.Row>
									</Tab>
									<Tab
										eventKey="endereco"
										title="Endereço"
										tabClassName="cadastro-tab"
									>
										<Form.Row>
											<Col>
												<Form.Group controlId="formBasicCEP">
													<Field
														className="form-control"
														name="cep"
														type="text"
														placeholder="CEP"
													/>
													<ErrorMessage
														className="error-message"
														name="cep"
														component="div"
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group controlId="formBasicEstado">
													<Field
														className="form-control"
														name="estado"
														type="text"
														placeholder="Estado"
													/>
													<ErrorMessage
														className="error-message"
														name="estado"
														component="div"
													/>
												</Form.Group>
											</Col>
										</Form.Row>
										<Form.Row>
											<Col>
												<Form.Group controlId="formBasicCidade">
													<Field
														className="form-control"
														name="cidade"
														type="text"
														placeholder="Cidade"
													/>
													<ErrorMessage
														className="error-message"
														name="cidade"
														component="div"
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group controlId="formBasicBairro">
													<Field
														className="form-control"
														name="bairro"
														type="text"
														placeholder="Bairro"
													/>
													<ErrorMessage
														className="error-message"
														name="bairro"
														component="div"
													/>
												</Form.Group>
											</Col>
										</Form.Row>
										<Form.Row>
											<Col>
												<Form.Group controlId="formBasicRua">
													<Field
														className="form-control"
														name="rua"
														type="text"
														placeholder="Rua"
													/>
													<ErrorMessage
														className="error-message"
														name="rua"
														component="div"
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group controlId="formBasicNumero">
													<Field
														className="form-control"
														name="numero"
														type="text"
														placeholder="Número"
													/>
													<ErrorMessage
														className="error-message"
														name="numero"
														component="div"
													/>
												</Form.Group>
											</Col>
										</Form.Row>
										<Form.Row>
											<Col>
												<Form.Group controlId="formBasicComplemento">
													<Field
														className="form-control"
														name="complemento"
														type="textarea"
														placeholder="Complemento"
													/>
													<ErrorMessage
														className="error-message"
														name="complemento"
														component="div"
													/>
												</Form.Group>
											</Col>
										</Form.Row>
									</Tab>
								</Tabs>
								<Form.Row>
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

export default OngForm;
