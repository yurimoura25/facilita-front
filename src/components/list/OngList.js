import { useEffect } from "react";
import ongFilter from "../../redux/filters/OngFilter"; 

import {connect} from "react-redux";

import  {listarOngs, buscarOng, setOngItem} from "../../redux/actions/OngAction";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";

function OngList(props) {
	useEffect(() => {
		props.listarOngs();
	}, []);

	return (
		<>
		<input type="text" className="search-ong"/>
		<ul className="ong-list">
			{props.ongLista.map((ong) => {
				return (
					<li className="ong-list-item">
						{ong.cnpj} - {ong.razaoSocial} - {ong.email} -{" "}
						{
							<FontAwesomeIcon
								className="btn-focus"
								onClick={() => {
									if (
										!(
											props.position ==
											{ lat: ong.listEnderecos[0]? ong.listEnderecos[0].latitude : null, 
											  lng: ong.listEnderecos[0]? ong.listEnderecos[0].longitude: null }
										)
									) {
										console.log(ong)
										props.setPosition({ lat: ong.listEnderecos[0]? ong.listEnderecos[0].latitude : null,
											lng: ong.listEnderecos[0]? ong.listEnderecos[0].longitude: null });
									}
									props.setOngItem({
											cnpj: ong.cnpj || null,
											razaoSocial: ong.razaoSocial,
											email: ong.email || null,
											listEnderecos: ong.listEnderecos
									});
								}}
								icon={faMapMarkedAlt}
							/>
						}
					</li>
				);
			})}
		</ul>
		</>
	);
}

export default connect(ongFilter, {listarOngs, buscarOng, setOngItem}) (OngList); 
