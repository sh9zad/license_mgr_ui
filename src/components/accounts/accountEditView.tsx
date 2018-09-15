import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AlertDlg } from "../stateless/alert";
import { IAccount } from "../../models";

interface IState {
  account: IAccount;
  showAlert: boolean;
  alertMessage: string;
  alertType: string;
}

export class AccountEditView extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state: IState = {
    account: {},
    alertMessage: "",
    alertType: "",
    showAlert: false
  };

  public componentDidMount(): void {
    const pathname = this.props.location.pathname.split("/");
    const productId = pathname[pathname.length - 1];

    fetch("http://localhost:3030/account/" + productId)
      .then(response => response.json())
      .then((data: IAccount) => this.setState({ account: data }));
  }

  public closeAlertDialog() {
    this.setState({ showAlert: false, alertMessage: "" });
  }

  public inputChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
    const { account } = this.state;
    account[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ account });
  }

  public formSubmitHandler() {
    const { account } = this.state;
    //tslint:disable
    fetch("http://localhost:3030/account/" + this.state.account._id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(account)
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
            account: data
          });
        }
      })
      .catch((reason: any) => {
        console.log("here");
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
    const { account } = this.state;
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
              id="account_name"
              type="text"
              value={account.account_name}
              onChange={this.onInputChange}
            />
            <label>Code</label>
            <input
              className="form-control"
              id="client_code"
              type="text"
              value={account.client_code}
              onChange={this.onInputChange}
            />
            <label>Phone</label>
            <input
              className="form-control"
              id="phone"
              type="text"
              value={account.phone}
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
      </div>
    );
  }
}
