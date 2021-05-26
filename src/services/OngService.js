import axios from "axios";

const URL = "http://localhost:8080";

const listar = () => {
	return axios.get(`${URL}/instituicao`);
};
const buscarPeloId = (id) => {
	if (id !== undefined) {
		return axios.get(`${URL}/instituicao/` + id);
	}
};

const salvar = (instituicao) => {
	if (instituicao.id === undefined) {
		return axios.post(`${URL}/instituicao/`, instituicao);
	} else {
		return axios.put(`${URL}/instituicao/${instituicao.id}`, instituicao);
	}
};

const excluir = (id) => {
	return axios.delete(`${URL}/instituicao/${id}`);
};

export default {
	listar,
	buscarPeloId,
	salvar,
	excluir,
};
