import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { IProductDetails, IProductSectionNamed } from "../../models";
import { Helpers } from "../../helpers/helpers";
import * as Transform from "../../helpers/transform";

interface IProductDetailViewState {
  productDetails: IProductDetails;
  sectionsNamed: IProductSectionNamed[];
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
    },
    sectionsNamed: []
  };

  private baseEndpoint: string = "product";

  public componentDidMount(): void {
    const pathSegments = Helpers.getURLSegments(this.props.location.pathname);
    const url: string = Helpers.getURL(
      this.baseEndpoint + "/details/" + pathSegments[pathSegments.length - 1]
    );

    fetch(url)
      .then(response => response.json())
      .then((data: IProductDetails) =>
        this.setState({
          productDetails: data,
          sectionsNamed: Transform.combineLicenseSection(
            data.productSections,
            data.licenseSections
          )
        })
      );
  }

  public render() {
    const { product } = this.state.productDetails;
    const licenseSections = this.renderLicenseSections();
    return (
      <div>
        <h2>Product Details</h2>
        <div className={"row justify-content-md-center"}>
          <div className={"col-2"}>
            Name: <strong>{product.name}</strong>
          </div>
          <div className={"col-2"}>
            Code: <strong>{product.code}</strong>
          </div>
          <div className={"col-2"}>
            Salt: <strong>{product.salt}</strong>
          </div>
        </div>
        <h3 className={"pull-left"}>Sections</h3>
        <Link
          to={"/license/section/create/" + product._id}
          className={"btn btn-success"}
        >
          <span className={"fa fa-plus"} />
        </Link>
        <div className={"row justify-content-md-center"}>
          <div className={"col-10"}>
            <table className={"table table-striped table-bordered"}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>{licenseSections}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  private renderLicenseSections(): JSX.Element[] {
    const { sectionsNamed } = this.state;

    return sectionsNamed.map(
      (sectionNamed: IProductSectionNamed, index: number) => {
        return (
          <tr key={sectionNamed.productSection._id}>
            <td>{index + 1}</td>
            <td>
              {sectionNamed.licenseSection && sectionNamed.licenseSection.name
                ? sectionNamed.licenseSection.name
                : ""}
            </td>
            <td>
              {sectionNamed.licenseSection && sectionNamed.licenseSection.type
                ? sectionNamed.licenseSection.type
                : ""}
            </td>
          </tr>
        );
      }
    );
  }
}
