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

export interface IAddProductAction { payload: {product: IProduct}, type: ActionTypes.ADD_PRODUCT};
export interface IGetProductAction { type: ActionTypes.FETCH_PRODUCTS };

export type ProductAction = IAddProductAction | IGetProductAction;

export function addProduct(product: IProduct): IAddProductAction {
    
    return {        
        payload: {
            product: {
                _id: '',
            }
        },
        type: ActionTypes.ADD_PRODUCT,
    }
}

export function getProducts(): IGetProductAction {
    return {type: ActionTypes.FETCH_PRODUCTS }
}


