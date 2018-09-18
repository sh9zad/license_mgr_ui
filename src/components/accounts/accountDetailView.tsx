import * as React from "react";
import { RouteComponentProps } from "react-router";
import { IAccountDetails, ILicense } from "../../models";
import { Link } from "react-router-dom";

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
    const { account } = this.state.accountDetails;
    return (
      <div>
        <h2>Account Details</h2>
        <div className={"row  justify-content-md-center"}>
          <div className={"col-sm-1"}>Name</div>
          <div className={"col-sm-3"}>{account.account_name}</div>

          <div className={"col-sm-1"}>Phone</div>
          <div className={"col-sm-3"}>{account.phone}</div>
        </div>

        <h3 className={"pull-left"}>License</h3>
        <Link
          className={"btn btn-success"}
          to={"/license/create/account/" + account._id}
        >
          <span className={"fa fa-plus"} />
        </Link>
        <div className={"row  justify-content-md-center"}>
          <div className={"col-sm-10"}>
            <table className={"table table-striped table-boarded"}>
              <thead className={"thead-dark"}>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>License</th>
                </tr>
              </thead>
              <tbody>{this.renderLicense()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  private renderLicense() {
    const { licenses } = this.state.accountDetails;
    return licenses.map((license: ILicense) => {
      return (
        <tr key={license.id}>
          <td>{license.id}</td>
          <td>{license.product_id}</td>
          <td>{license.license}</td>
        </tr>
      );
    });
  }
}
