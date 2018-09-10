import * as constants from "../constants";
import { IProduct } from '../models/Product';

export enum ActionTypes {
    ADD_PRODUCT = 'ADD_PRODUCT',
    FETCH_PRODUCTS = 'FETCH_PRODUCTS',
}

export interface IAddProduct {
    type: constants.ADD_PRODUCT;
    payload: IProduct;
}
export interface IFetchProducts {
    type: constants.FETCH_PRODUCTS;
}

export interface AddProductAction { type: ActionTypes.ADD_PRODUCT, payload: {product: IProduct}};
export interface GetProductAction { type: ActionTypes.FETCH_PRODUCTS };

export type ProductAction = AddProductAction | GetProductAction;

export function addProduct(product: IProduct): AddProductAction {
    //post to API

    return {
        type: ActionTypes.ADD_PRODUCT,
        payload: {
            product: {
                _id: '',
            }
        }
    }
}

export function getProducts(): GetProductAction {
    return {type: ActionTypes.FETCH_PRODUCTS }
}


