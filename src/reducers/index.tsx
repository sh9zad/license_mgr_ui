import * as fromProducts from './products';
import { combineReducers } from 'redux';
export interface State {
    products: fromProducts.State
}

export const initialState: State = {
    products: fromProducts.initialState
}

export const reducer = combineReducers<State>({
    products: fromProducts.reducer
})