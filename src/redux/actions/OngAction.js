import OngService from "../../services/OngService";

export const ONG_ACTIONS = {
	LISTAR: "ONG_LISTAR",
	BUSCAR: "ONG_BUSCAR",
	EXCLUIR: "ONG_EXCLUIR",
	SALVAR: "ONG_SALVAR",
	SETITEM: "ONG_SET_ITEM"
};

export function listarOngs() {
	return (callback) => {
		OngService.listar()
			.then((response) => {
				callback({
					type: ONG_ACTIONS.LISTAR,
					content: response.data,
				});
			})
			.catch((error) => console.log("error: " + error));
	};
}

export function buscarOng(id) {
	return (callback) => {
		OngService.buscarPeloId(id).then((response) => {
			callback({
				type: ONG_ACTIONS.BUSCAR,
				content: response.data,
			});
		});
	};
}

export function salvarOng(ong) {
	return (callback) => {
		OngService.salvar(ong)
		.then(response => {
			callback({
				type: ONG_ACTIONS.SALVAR,
				content: response.data
			})
		})
	}
}

export function excluirOng(id) {
	return (callback) => {
		OngService.excluir(id)
		.then(response => {
			callback({
				type: ONG_ACTIONS.EXCLUIR,
				content: response.data
			})
		})
	} 
}

export function setOngItem(ong) {
	return (callback) => {
		callback({
			type: ONG_ACTIONS.SETITEM,
			content: ong
		})
	}
}