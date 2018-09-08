import * as constants from "../constants";
import { IProduct } from '../models/Product';
import {Dispatch} from "redux";
import { IStoreState } from "../types";

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
        type: constants.ADD_PRODUCT,
        payload: product
    }
}

export function fetchProducts(): IFetchProducts {
    
    return {
        type: constants.FETCH_PRODUCTS,
        payload: []
    }
}