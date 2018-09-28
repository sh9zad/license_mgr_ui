import * as React from "react";
import { RouteComponentProps } from "react-router";
import { IProduct, IAccount, ILicenseSection } from "../../models";
import { Helpers } from "../../helpers/helpers";

interface ILicenseCreateViewState {
  licenseSections: ILicenseSection[];
  selectedProductID: string;
  products: IProduct[];
  selectedSectionIds: string[];
  accounts?: IAccount[];
  module?: string;
  _id?: string;
}

export class LicenseCreateView extends React.Component<
  RouteComponentProps<any>,
  ILicenseCreateViewState
> {
  public state: ILicenseCreateViewState = {
    licenseSections: [],
    products: [],
    selectedProductID: "",
    selectedSectionIds: []
  };

  public componentDidMount(): void {
    const pathSegments = Helpers.getURLSegments(this.props.location.pathname);
    const url: string = Helpers.getURL("product");
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          _id: pathSegments[pathSegments.length - 1],
          module: pathSegments[pathSegments.length - 2],
          products: data
        })
      );
  }

  public render() {
    return (
      <div>
        <h1>Create License</h1>
        <div className={"row justify-content-md-center"}>
          <div className={"col-2"}>Product</div>
          <div className={"col-3"}>
            <select className={"form-control"} onChange={this.onProductChange}>
              <option value={0}> Select </option>
              {this.renderProduct()}
            </select>
          </div>

          <div className={"col-2"}>License Options</div>
          <div className={"col-3"}>
            <select
              className={"form-control"}
              multiple={true}
              onChange={this.onSectionChange}
            >
              <option value={0}> Select </option>
              {this.renderSections()}
            </select>
          </div>
        </div>

        <div className={"row  justify-content-md-center"}>
          <div className={"col-2"}>Account</div>
          <div className={"col-3"}>Account Name</div>
        </div>

        <div className={"row  justify-content-md-center"}>
          <button
            className={"btn btn-success"}
            onClick={this.onGenerateLicenseClick}
          >
            <span className="fa fa-save" /> Generate License
          </button>
        </div>
      </div>
    );
  }

  private onGenerateLicenseClick = (): void =>
    this.onGenerateLicenseClickHandler();

  private onProductChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    this.onProductChangeHandler(e);

  private onSectionChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    this.onSectionChangeHandler(e);

  private onGenerateLicenseClickHandler(): void {
    console.log(this.state.selectedSectionIds, this.state.selectedProductID);
    const url: string = Helpers.getURL(
      "license/section/relate/product/" + this.state.selectedProductID
    );

    console.log(url);

    fetch(url, {
      body: JSON.stringify(this.state.selectedSectionIds),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  private onSectionChangeHandler(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
    if (e.currentTarget.selectedOptions.length > 0) {
      const selectedSectionIds: string[] = [];

      // tslint:disable-next-line
      for (let i = 0; i < e.currentTarget.selectedOptions.length; i++) {
        selectedSectionIds.push(
          e.currentTarget.selectedOptions[i].value.toString()
        );
      }

      this.setState({ ...this.setState, selectedSectionIds });
    }
  }

  private onProductChangeHandler(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
    const productId = e.currentTarget.value;
    const url = Helpers.getURL("license/section/" + productId);

    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          licenseSections: data.licenseSections,
          selectedProductID: productId,
          selectedSectionIds: []
        })
      );
  }

  private renderProduct(): JSX.Element[] {
    return this.state.products.map(product => {
      return (
        <option key={product._id} value={product._id}>
          {product.name}
        </option>
      );
    });
  }

  private renderSections(): JSX.Element[] {
    return this.state.licenseSections.map(section => {
      return (
        <option key={section._id} value={section._id}>
          {section.name}
        </option>
      );
    });
  }
}
