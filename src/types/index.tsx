import { IProduct } from "../models/Product";

export interface IStoreState {
    products: IProduct[];
    product: IProduct;
}