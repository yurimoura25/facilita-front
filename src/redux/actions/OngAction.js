import OngService from "../../services/OngService";

export const ONG_ACTIONS = {
	LISTAR: "ONG_LISTAR",
	BUSCAR: "ONG_BUSCAR",
	EXCLUIR: "ONG_EXCLUIR",
	SALVAR: "ONG_SALVAR",
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