import React, { useCallback, useMemo, useRef, useState } from "react";
import { Modal, Form, Col, Container, Tabs, Tab } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import "../../css/Cadastro.css";
import "../../css/Endereco.css";
import OngService from "../../services/OngService";
import L from "leaflet";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
} from "react-leaflet";

const accessToken =
	"pk.eyJ1IjoieXVyaW0yNSIsImEiOiJja29hdW5oMGkwMnQ2Mm5vMnphZzM5cjVkIn0.6WmEOInxZooASiMB6AuP7w";

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
	latitude: "",
	longitude: "",
};

function getIcon(_iconSize) {
	return L.icon({
		iconUrl: `${process.env.PUBLIC_URL}/img/marker.svg`,
		iconSize: _iconSize,
	});
}

//Localização
function DraggableMarker(props) {
	const [draggable, setDraggable] = useState(true)
	const markerRef = useRef(null)
	const eventHandlers = useMemo(
	  () => ({
		dragend() {
		  const marker = markerRef.current
		  if (marker != null) {
			props.setPosition(marker.getLatLng())
		  }
		},
	  }),
	  [],
	)
	const toggleDraggable = useCallback(() => {
	  setDraggable((d) => !d)
	}, [])
  
	return (
	  <Marker
		draggable={draggable}
		eventHandlers={eventHandlers}
		position={props.position}
		icon={getIcon(50)}
		ref={markerRef}>
		<Popup minWidth={90}>
			Posicione no local da instituição.
		</Popup>
	  </Marker>
	)
  }
  


function OngForm(props) {
	const [key, setKey] = useState("ongInfo");
	const history = useHistory();
	const [position, setPosition] = useState({
		lat: -16.689,
		lng: -49.265,
	});

	function LocationMarker() {
		const map = useMapEvents({
			click(place) {
				setPosition(place.latlng);
				map.flyTo(place.latlng, map.getZoom());
			},
		});
		return position === null ? null : (
			<Marker position={position}>
				<Popup>You are here</Popup>
			</Marker>
		);
	}

	const signUpSchema = Yup.object().shape({
		...defaultSchema,
		cnpj: Yup.string()
			.matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "Apenas números")
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
							...position,
						}}
						validationSchema={signUpSchema}
						enableReinitialize
						onSubmit={(fields) => {
							props.onHide();
							console.log(fields);
							history.push("/instituicoes");
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
											<button
												className="cadastro-button"
												onClick={() => setKey("endereco")}
												type="button"
											>
												Cadastrar Endereço
											</button>
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
										<Form.Row>
											<button
												className="cadastro-button"
												onClick={() => setKey("localizacao")}
												type="button"
											>
												Marcar localização
											</button>
										</Form.Row>
									</Tab>
									{/* TAB - MAPA */}
									<Tab
										eventKey="localizacao"
										title="Localização"
										tabClassName="cadastro-tab"
									>
										<Form.Row>
											<Col>
												<Form.Group controlId="formBasicLat">
													<Field
														className="form-control"
														name="lat"
														type="text"
														placeholder="latitude"
														value={values.lat}
													/>
													<ErrorMessage
														className="error-message"
														name="lat"
														component="div"
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group controlId="formBasicLng">
													<Field
														className="form-control"
														name="lng"
														type="text"
														placeholder="Longitude"
														value={values.lng}
													/>
													<ErrorMessage
														className="error-message"
														name="lng"
														component="div"
													/>
												</Form.Group>
											</Col>
										</Form.Row>
										<Form.Row>
											<MapContainer
												className="localizacao-mapa"
												center={{ lat: position.lat, lng: position.lng }}
												zoom={13}
												scrollWheelZoom={true}
											>
												<TileLayer
													url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
													accessToken={accessToken}
													id="mapbox/streets-v11"
												/>
												<DraggableMarker position={position} setPosition={setPosition} />
											</MapContainer>
										</Form.Row>
										<Form.Row>
											{" "}
											<button
												className="cadastro-button"
												type="submit"
												disabled={isSubmitting}
											>
												Sign up
											</button>
										</Form.Row>
									</Tab>
								</Tabs>
								<Form.Row>
									<Col></Col>
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
