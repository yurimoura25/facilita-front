import { useState } from "react";
import OngList from "../list/OngList";
import { Col, Container, Row } from "react-bootstrap";
import L from "leaflet";
import "../../css/OngMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

const accessToken =
	"pk.eyJ1IjoieXVyaW0yNSIsImEiOiJja25hc3d6aGcwZ3B4MndtaXV4ZDczOHJsIn0.MjJnTcARUriA_9tI-oQG7Q";

function getIcon(_iconSize) {
	return L.icon({
		iconUrl: `${process.env.PUBLIC_URL}/img/marker.svg`,
		iconSize: _iconSize,
	});
}

function MapPage() {
	const [position, setPosition] = useState({ lat: -11.689, lng: -44.265 });
	const [ongInfo, setOngInfo] = useState({
		detalhes: {
			cnpj: "00.000.000/0001-91",
			razaoSocial: "Sorriso Feliz",
			email: "feliz@gmail.com",
		},
		endereco: {
			cep: "",
			estado: "",
			cidade: "",
			bairro: "",
			rua: "Rua da Amizade",
			numero: "",
			complemento: "",
		},
	});

	function OngMap(props) {
		function LocationMarker() {
			return props.position === null ? null : (
				<Marker position={props.position} icon={getIcon(50)}>
					<Popup
						className="ong-popup-detalhes"
						keepInView={true}
						minWidth={400}
						minHeight={500}
					>
						{/* <Container className="detalhes-container"> */}
						<Row>
							<Col>{props.ongInfo.detalhes.razaoSocial}</Col>
							<Col>{props.ongInfo.detalhes.cnpj}</Col>
						</Row>
						<Row>
							<Col>{props.ongInfo.endereco.rua}</Col>
						</Row>
						<Row>
							<Col>
								<button className="detalhes-button btn" type="button">
									Detalhes
								</button>
							</Col>
							<Col>
								<button className="doacao-button btn button" type="button">
									Doar
								</button>
							</Col>
						</Row>
						{/* </Container> */}
					</Popup>
				</Marker>
			);
		}
		return (
			<MapContainer
				className="map"
				center={props.position}
				zoom={13}
				scrollWheelZoom={true}
			>
				<TileLayer
					url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
					accessToken={accessToken}
					id="mapbox/streets-v11"
				/>
				<LocationMarker />
			</MapContainer>
		);
	}

	return (
		<div className="pageInstituicoes">
			<div id="listInstituicao">
				<OngList setPosition={setPosition} setOngInfo={setOngInfo} />
			</div>
			<Container className="mapPage">
				<OngMap
					position={position}
					setPosition={setPosition}
					ongInfo={ongInfo}
				/>
			</Container>
		</div>
	);
}

export default MapPage;
