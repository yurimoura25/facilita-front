import values from "lodash/values";

export default function usuarioFilter({usuarioState}) {
    return  {
        usuarioLista: values(usuarioState.usuarioLista),
        usuarioItem: usuarioState.usuarioItem
    }
}