import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IProductDetails } from "../../models";
import { Helpers } from "../../helpers/helpers";

interface IProductDetailViewState {
  productDetails: IProductDetails;
}

export class ProductDetailView extends React.Component<
  RouteComponentProps<any>,
  IProductDetailViewState
> {
  public state: IProductDetailViewState = {
    productDetails: {
      licenseSections: [],
      product: {},
      productSections: []
    }
  };

  private baseEndpoint: string = "product";

  public componentDidMount(): void {
    const pathSegments = Helpers.getURLSegments(this.props.location.pathname);
    const url: string = Helpers.getURL(
      this.baseEndpoint + "/details/" + pathSegments[pathSegments.length - 1]
    );
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ productDetails: data }));
  }

  public render() {
    return (
      <div>
        <h2>Product Details</h2>
      </div>
    );
  }
}
