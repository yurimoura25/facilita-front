import { useState } from "react";
import OngList from "../list/OngList";
import { Col, Container, Row } from "react-bootstrap";
import L from "leaflet";
import "../../css/OngMap.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ongFilter from "../../redux/filters/OngFilter"; 

import {Link} from 'react-router-dom';

import {connect} from "react-redux";

import  {listarOngs, buscarOng} from "../../redux/actions/OngAction";

const accessToken =
	"pk.eyJ1IjoieXVyaW0yNSIsImEiOiJja25hc3d6aGcwZ3B4MndtaXV4ZDczOHJsIn0.MjJnTcARUriA_9tI-oQG7Q";

function getIcon(_iconSize) {
	return L.icon({
		iconUrl: `${process.env.PUBLIC_URL}/img/marker.svg`,
		iconSize: _iconSize,
	});
}

function MapPage(props) {
	const [position, setPosition] = useState({ lat: -11.689, lng: -44.265 });

	function OngMap(props) {
		function LocationMarker(props) {
			return !props.ongItem.listEnderecos? 
			 (<div> Esta ong não possui endereço cadastrado</div>) : (
				props.ongItem.listEnderecos.map(endereco => (
					<Marker position={{lat: endereco.latitude, lng: endereco.longitude}} icon={getIcon(50)}>
					<Popup
						className="ong-popup-detalhes"
						keepInView={true}
						minWidth={400}
						minHeight={500}
					>
						{/* <Container className="detalhes-container"> */}
						<Row>
							<Col>{props.ongItem.razaoSocial}</Col>
							<Col>{props.ongItem.cnpj}</Col>
						</Row>
						<Row>
							<Col>Rua: {endereco.rua} </Col>
						</Row>
						<Row>
							<Col>
								<Link to={`/instituicao/${props.ongItem.id}`} className="detalhes-button btn" type="button">
									Detalhes
								</Link>
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
				))
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
				<LocationMarker ongItem={props.ongItem}/>
				{props.ongItem.listEnderecos.length == 0? props.ongItem.listEnderecos : (<div> Esta ong não possui endereço cadastrado</div>)}
			</MapContainer>
		);
	}

	return (
		<div className="pageInstituicoes">
			<div id="listInstituicao">
				<OngList setPosition={setPosition} />
			</div>
			<Container className="mapPage">
				<OngMap
					position={position}
					setPosition={setPosition}
					ongItem={props.ongItem}
				/>
			</Container>
		</div>
	);
}
export default connect(ongFilter, {listarOngs, buscarOng}) (MapPage); 
