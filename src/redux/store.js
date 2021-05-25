import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import ongReducer from "./reducers/OngReducer"

const reducers = combineReducers({
    ongState: ongReducer
})

const localState = localStorage.getItem('@facilitaState') ? JSON.parse(localStorage.getItem('@facilitaState')) : {};

const store = createStore(
    reducers,
    localState,
    applyMiddleware(thunk)
);

store.subscribe(function() {
    localStorage.setItem('@facilitaState', JSON.stringify(store.getState()));
})

export default store;