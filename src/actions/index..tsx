import * as constants from "../constants";

export interface IAddProduct {
    type: constants.ADD_PRODUCT
}

export type ProductAction = IAddProduct;

export function addProduct(): IAddProduct {
    return {
        type: constants.ADD_PRODUCT
    }
}