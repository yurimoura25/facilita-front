import { useEffect, useState } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import OngService from "../../services/OngService";

function OngList() {
	const [ongList, setOngList] = useState([]);

	useEffect(() => {
		OngService.listar()
			.then((response) => {
				console.log(response);
				setOngList(response.data);
			})
			.catch((error) => {
				console.log(`error: ${error}`);
			});
	}, []);

	return (
		<Container>
			<Row>
				<Col>
					<h1>Lista de ONGs</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Id</th>
								<th>CNPJ</th>
								<th>Razão Social</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{ongList.map((ong) => {
								return (
									<tr>
										<td>{ong.id}</td>
										<td>{ong.cnpj}</td>
										<td>{ong.razaoSocial}</td>
										<td>{ong.email}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
}

export default OngList;
