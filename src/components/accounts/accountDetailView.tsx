import * as React from "react";
import { RouteComponentProps } from "react-router";
import { IAccountDetails } from "../../models";

interface IState {
  accountDetails: IAccountDetails;
}

export class AccountDetailView extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state: IState = {
    accountDetails: {
      account: {},
      licenses: []
    }
  };

  public componentDidMount(): void {
    const pathname = this.props.location.pathname.split("/");
    const accountId = pathname[pathname.length - 1];
    console.log(accountId);
    fetch("http://localhost:3030/account/details/" + accountId)
      .then(response => response.json())
      .then((data: IAccountDetails) => this.setState({ accountDetails: data }));
  }

  public render() {
    const { accountDetails } = this.state;
    return (
      <div>
        <h2>Account Details</h2>
        <div className={"row"}>
          <div className={"col-sm-1"}>Name</div>
          <div className={"col-sm-3"}>
            {accountDetails.account.account_name}
          </div>

          <div className={"col-sm-1"}>Phone</div>
          <div className={"col-sm-3"}>{accountDetails.account.phone}</div>
        </div>

        <h3>License</h3>
      </div>
    );
  }
}
