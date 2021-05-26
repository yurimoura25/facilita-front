import UsuarioService from "../../services/UsuarioService";

export const USUARIO_ACTIONS = {
	LISTAR: "USUARIO_LISTAR",
	BUSCAR: "USUARIO_BUSCAR",
	EXCLUIR: "USUARIO_EXCLUIR",
	SALVAR: "USUARIO_SALVAR",
};

export function listarUsuarios() {
	return (callback) => {
		UsuarioService.listar()
			.then((response) => {
				callback({
					type: USUARIO_ACTIONS.LISTAR,
					content: response.data,
				});
			})
			.catch((error) => console.log("error: " + error));
	};
}

export function buscarUsuario(id) {
	return (callback) => {
		UsuarioService.buscarPeloId(id).then((response) => {
			callback({
				type: USUARIO_ACTIONS.BUSCAR,
				content: response.data,
			});
		});
	};
}

export function salvarUsuario(Usuario) {
	return (callback) => {
		UsuarioService.salvar(Usuario)
		.then(response => {
			callback({
				type: USUARIO_ACTIONS.SALVAR,
				content: response.data
			})
		})
	}
}

export function excluirUsuario(id) {
	return (callback) => {
		UsuarioService.excluir(id)
		.then(response => {
			callback({
				type: USUARIO_ACTIONS.EXCLUIR,
				content: response.data
			})
		})
	} 
}