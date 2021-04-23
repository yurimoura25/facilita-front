import axios from "axios";

const URL = "http://localhost:8080";

const listar = () => {
	return axios.get(`${URL}/usuario`);
};

const buscarPeloId = (id) => {
	if (id != undefined) {
		return axios.get(`${URL}/usuario/` + id);
	}
};

const salvar = (pessoa) => {
	if (pessoa.id == undefined) {
		return axios.post(`${URL}/usuario/`, pessoa);
	} else {
		return axios.put(`${URL}/usuario/${pessoa.id}`, pessoa);
	}
};

const excluir = (id) => {
	return axios.delete(`${URL}/usuario/${id}`);
};

export default {
	listar,
	buscarPeloId,
	salvar,
	excluir,
};
