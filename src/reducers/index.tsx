import * as fromProducts from './products';
import { combineReducers } from 'redux';
export interface IState {
    products: fromProducts.IState
}

export const initialState: IState = {
    products: fromProducts.initialState
}

export const reducer = combineReducers<IState>({
    products: fromProducts.reducer
})