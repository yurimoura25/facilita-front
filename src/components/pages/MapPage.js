import OngMap from "../maps/OngMap";
import OngList from "../list/OngList";
import { Container } from "react-bootstrap";

function MapPage() {
	return (
		<div className="pageInstituicoes">
			<div id="listInstituicao">
				<OngList></OngList>
			</div>
			<Container className="mapPage">
				<OngMap />
			</Container>
		</div>
	);
}

export default MapPage;
