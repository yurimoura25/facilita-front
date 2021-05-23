import values from "lodash/values";

export default function ongFilter({ongState}) {
    return  {
        ongLista: values(ongState.ongLista),
        ongItem: ongState.ongItem
    }
}