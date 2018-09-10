import { State } from '../reducers';
import { createSelector } from 'reselect';


const getProductsState = ((state: State) => state.products)

export const getProducts = createSelector([getProductsState], s => s.products);