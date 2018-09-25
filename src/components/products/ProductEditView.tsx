import * as React from "react";
import { IProduct } from "../../models/Product";
import { RouteComponentProps } from "react-router";
import { AlertDlg } from "../stateless/alert";
import { LicenseSectionListView } from "../licenseSection";

interface IState {
  product: IProduct;
  showAlert: boolean;
  alertMessage: string;
  alertType: string;
}

export class ProductEditView extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state: IState = {
    alertMessage: "",
    alertType: "",
    product: {},
    showAlert: false
  };

  public componentDidMount(): void {
    const pathname = this.props.location.pathname.split("/");
    const productId = pathname[pathname.length - 1];

    fetch("http://localhost:3030/product/" + productId)
      .then(response => response.json())
      .then((data: IProduct) => this.setState({ product: data }));
  }

  public closeAlertDialog() {
    this.setState({ showAlert: false, alertMessage: "" });
  }

  public inputChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
    const { product } = this.state;
    product[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ product });
  }

  public formSubmitHandler() {
    const { product } = this.state;
    //tslint:disable
    fetch("http://localhost:3030/product/" + this.state.product._id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          this.setState({
            alertType: "error",
            alertMessage: data.message,
            showAlert: true
          });
        } else {
          this.setState({
            alertType: "success",
            alertMessage: "Product added successfully",
            showAlert: true,
            product: data
          });
        }
      })
      .catch((reason: any) => {
        this.setState({
          alertMessage: reason,
          showAlert: true
        });
      });
  }

  public onInputChange = (e: React.FormEvent<HTMLInputElement>): void =>
    this.inputChangeHandler(e);
  public onFormSubmit = (): void => this.formSubmitHandler();
  public onCloseDialog = (): void => this.closeAlertDialog();

  public render() {
    const { product } = this.state;
    return (
      <div>
        <AlertDlg
          level={this.state.alertType}
          message={this.state.alertMessage}
          visible={this.state.showAlert}
          closeDialog={this.onCloseDialog}
        />
        <div className={"row  justify-content-md-center"}>
          <h3 className={"col-sm-10"}>Add New Product</h3>
        </div>
        <div className={"row justify-content-md-center"}>
          <div className={"col-sm-9"}>
            <label>Name</label>
            <input
              className="form-control"
              id="name"
              type="text"
              value={product.name}
              onChange={this.onInputChange}
            />
            <label>Code</label>
            <input
              className="form-control"
              id="code"
              type="text"
              value={product.code}
              onChange={this.onInputChange}
            />
            <label>Salt</label>
            <input
              className="form-control"
              id="salt"
              type="text"
              value={product.salt}
              onChange={this.onInputChange}
            />
            <button
              className="btn btn-success btn-small"
              type="button"
              onClick={this.onFormSubmit}
            >
              <span className="fa fa-edit" /> Edit
            </button>
          </div>
        </div>
        <div className={"row justify-content-md-center"}>
          <LicenseSectionListView />
        </div>
      </div>
    );
  }
}
