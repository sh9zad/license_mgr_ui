import { ProductAction } from "../actions/index.";
import { ADD_PRODUCT } from "../constants";
import { IProduct } from "../models/Product";
import { IStoreState } from "../types";

export function product(state: IStoreState, action: ProductAction, p: IProduct): IStoreState {
    switch (action.type) {
        case ADD_PRODUCT:
            const { products } = state;
            products.push(p);
            return { ...state, products };
    }

    return state;
}