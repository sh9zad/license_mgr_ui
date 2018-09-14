import * as React from "react";
import { Component } from "react";
import { IProduct } from "../../models/Product";
import { ProductAddNew } from "./productAddNew";
import { ProductListView } from "./productListView";

interface IProductState {
  product: IProduct;
  products: IProduct[];
}

export class ProductContainer extends Component<object, IProductState> {
  public state: IProductState = {
    product: {},
    products: []
  };

  public componentDidMount(): void {
    fetch("http://localhost:3030/product")
      .then(response => response.json())
      .then((data: IProduct[]) => this.setState({ products: data }));
  }

  public render() {
    return (
      <div className={"row"}>
        <div className={"col-sm-4"}>
          <ProductAddNew />
        </div>
        <div className={"col-sm-8"}>
          <ProductListView products={this.state.products} />
        </div>
      </div>
    );
  }
}
