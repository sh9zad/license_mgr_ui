import * as React from "react";
import { AlertDlg } from "../stateless/alert";
import { IAccount } from "../../models";

interface ISate {
  account: IAccount;
  showAlert: boolean;
  alertType: string;
  alertMessage: string;
}

export class AccountAddNew extends React.Component<{}, ISate> {
  public state: ISate = {
    account: {},
    alertMessage: "",
    alertType: "",
    showAlert: false
  };

  public inputChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
    const { account } = this.state;
    account[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ account });
  }

  public closeAlertDialog() {
    this.setState({ showAlert: false, alertMessage: "" });
  }

  public formSubmitHandler() {
    const { account } = this.state;

    fetch("http://localhost:3030/account", {
      body: JSON.stringify(account),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          this.setState({
            alertMessage: data.message,
            alertType: "error",
            showAlert: true
          });
        } else {
          this.setState({
            account: data,
            alertMessage: "Account added successfully",
            alertType: "success",
            showAlert: true
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
              onChange={this.onInputChange}
            />
            <label>Code</label>
            <input
              className="form-control"
              id="client_code"
              type="text"
              onChange={this.onInputChange}
            />
            <label>Phone</label>
            <input
              className="form-control"
              id="phone"
              type="number"
              onChange={this.onInputChange}
            />
            <button
              className="btn btn-success btn-small"
              type="button"
              onClick={this.onFormSubmit}
            >
              <span className="fa fa-plus" /> Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
