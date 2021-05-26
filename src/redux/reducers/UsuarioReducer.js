import { USUARIO_ACTIONS } from "../actions/UsuarioAction";

const usuarioState = {
	usuarioLista: [],
	usuarioItem: {},
};

function usuarioReducer(state = usuarioState, callback) {
	switch (callback.type) {
		case USUARIO_ACTIONS.LISTAR:
			return {
                ...state,
                usuarioLista: callback.content,
            };
        
        case USUARIO_ACTIONS.BUSCAR:
            return {
                ...state,
                usuarioItem: callback.content,
            }
        case USUARIO_ACTIONS.SALVAR:
            return {
                ...state,
                usuarioItem: callback.content
            }
        default: 
            return state;
	}
}

export default usuarioReducer;