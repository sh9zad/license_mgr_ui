import * as constants from "../constants";
import { IProduct } from '../models/Product';

export interface IAddProduct {
    type: constants.ADD_PRODUCT;
    payload: IProduct;
}
export interface IFetchProducts {
    type: constants.FETCH_PRODUCTS;
    payload: IProduct[];
}

export type ProductAction = IAddProduct | IFetchProducts;

export function addProduct(product: any): IAddProduct {
    return {
        payload: product,
        type: constants.ADD_PRODUCT,
    }
}

export function fetchProducts(): IFetchProducts {

    return {
        payload: [],
        type: constants.FETCH_PRODUCTS,
    }
}