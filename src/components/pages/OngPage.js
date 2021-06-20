import { useEffect } from "react";
import ongFilter from "../../redux/filters/OngFilter";

import { useParams } from "react-router-dom";

import { connect } from "react-redux";

import { buscarOng } from "../../redux/actions/OngAction";

import { Container, Row, Col } from "react-bootstrap";

import '../../css/OngPage.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

function OngPage(props) {
	const { id } = useParams();
	useEffect(() => {
		try {
			props.buscarOng(id);
		} catch (err) {
			console.error(err);
		}
	}, []);

	console.log(props.ongItem);

	return (
		<Container>
			<Row>
				<Col id="ong-page-name">{props.ongItem.razaoSocial} {props.ongItem.cnpj != null ? `- ${props.ongItem.cnpj}` : ""}</Col>
			</Row>
			<Row>
				<Col>
					{props.ongItem.listEnderecos.map((endereco) => (
						<Row>
							{" "}
							Rua{" "}
							{`${endereco.rua} ${endereco.bairro} ${endereco.cidade} ${endereco.estado}`}{" "}
							<br />
							CEP: {`${endereco.cep}`}{" "}
							{endereco.numero != null ? endereco.numero : "S/n"}{" "}
							{endereco.complemento} <br />
							<br />
						</Row>
					))}
				</Col>
			</Row>
		</Container>
	);
}

export default connect(ongFilter, { buscarOng })(OngPage);
