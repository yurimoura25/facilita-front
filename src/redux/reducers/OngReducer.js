import { ONG_ACTIONS } from "../actions/OngAction";

const ongState = {
	ongLista: [],
	ongItem: {},
};

function ongReducer(state = ongState, callback) {
	switch (callback.type) {
		case ONG_ACTIONS.LISTAR:
			return {
                ...state,
                ongLista: callback.content,
            };
        
        case ONG_ACTIONS.BUSCAR:
            return {
                ...state,
                ongItem: callback.content,
            }
        
        default: 
            return state;
	}
}

export default ongReducer;