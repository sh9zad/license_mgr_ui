import { IState } from '../reducers';
import { createSelector } from 'reselect';


const getProductsState = ((state: IState) => state.products)

export const getProducts = createSelector([getProductsState], s => s.products);