import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../css/OngMap.css";

const accessToken =
	"pk.eyJ1IjoieXVyaW0yNSIsImEiOiJja25hc3d6aGcwZ3B4MndtaXV4ZDczOHJsIn0.MjJnTcARUriA_9tI-oQG7Q";

function OngMap() {
	const [latitude, setLatitude] = useState(undefined);
	const [longitude, setLongitude] = useState(undefined);
	const getLocalizacao = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(posicao);
		}
	};
	const posicao = (posicao) => {
		setLatitude(posicao.coords.latitude);
		setLongitude(posicao.coords.longitude);
	};
	return (
		<MapContainer
			className="map"
			center={[latitude ? latitude : 51.505, longitude ? longitude : -0.09]}
			zoom={13}
			whenCreated={getLocalizacao()}
			scrollWheelZoom={true}
		>
			<TileLayer
				url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
				accessToken={accessToken}
				id="mapbox/streets-v11"
			/>
			<Marker
				position={[latitude ? latitude : 51.505, longitude ? longitude : -0.09]}
			>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
}
export default OngMap;
