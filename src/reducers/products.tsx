import { IProduct } from '../models/Product';
import { ProductAction, ActionTypes,  } from '../actions/products';


export interface IState {
    products: IProduct[]
}

export const initialState: IState = {
    products: []
}

export function reducer( state: IState = initialState, action: ProductAction) {
    switch (action.type) {
        case ActionTypes.ADD_PRODUCT: {
            const product = action.payload.product;

            return {
                ...state,
                products: [...state.products, product]
            }
        }

        case ActionTypes.FETCH_PRODUCTS: {
            return {
                ...state
            }
        }

        default:
            return state;
    }
}