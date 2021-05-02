import OngMap from "../maps/OngMap";
import OngList from "../list/OngList";
import { Container } from "react-bootstrap";

function MapPage() {
	return (
		<Container>
			<OngList />
			<OngMap />
		</Container>
	);
}

export default MapPage;
