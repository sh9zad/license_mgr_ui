import { ProductAction } from "../actions/index.";
import { ADD_PRODUCT, FETCH_PRODUCTS } from "../constants";
import { IStoreState } from "../types";

export function product(state: IStoreState, action: ProductAction): IStoreState {
    switch (action.type) {
        case ADD_PRODUCT:
            return { ...state, product: action.payload };
            break;

        case FETCH_PRODUCTS:
            return { ...state, products: action.payload}
            break;

        default:
            return state;
    }

    return state;
}