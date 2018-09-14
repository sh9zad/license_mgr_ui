import * as React from "react";
import { IProduct } from "../../models/Product";
import { RouteComponentProps } from "react-router";

interface IState {
  product: IProduct;
}

export class ProductEditView extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state: IState = {
    product: {}
  };

  public componentDidMount(): void {
    const pathname = this.props.location.pathname.split("/");
    const productId = pathname[pathname.length - 1];

    fetch("http://localhost:3030/product/" + productId)
      .then(response => response.json())
      .then((data: IProduct) => this.setState({ product: data }));
  }

  public render() {
    return (
      <div>
        <h3>EditView</h3>
      </div>
    );
  }
}
