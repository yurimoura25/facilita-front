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
		<ul className="ong-list">
			{ongList.map((ong) => {
				return (
					<li className="ong-list-item">
						{ong.cnpj} - {ong.razaoSocial} - {ong.email}
					</li>
				);
			})}
		</ul>
	);
}

export default OngList;
