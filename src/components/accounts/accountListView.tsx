import * as React from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";
import { IAccount } from "../../models";

interface IState {
  accounts: IAccount[];
}

export class AccountListView extends React.Component<object, IState> {
  public state: IState = {
    accounts: []
  };

  public componentDidMount(): void {
    fetch("http://localhost:3030/account")
      .then(response => response.json())
      .then((data: IAccount[]) => this.setState({ accounts: data }));
  }

  public render() {
    const { accounts } = this.state;
    const renderedAccounts = accounts.map(account => (
      <tr key={account._id}>
        <td>{account._id}</td>
        <td>{account.account_name}</td>
        <td>{account.client_code}</td>
        <td>{account.phone}</td>
        <td>{moment(account.created_date).format("MM/DD/YYYY")}</td>
        <td>
          <Link
            className={"btn btn-warning"}
            to={"account/edit/" + account._id}
          >
            <span className={"fa fa-edit"} />
          </Link>
        </td>
        <td>
          <button className={"btn btn-danger"}>
            <span className={"fa fa-remove"} />
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="row justify-content-md-center">
        <div className={"col-sm-10"}>
          <h2 className={"pull-left"}>Account List</h2>
          <Link className={"btn btn-success pull-right"} to={"/account/new"}>
            <span className={"fa fa-plus"} /> ADD
          </Link>
          <table className={"table table-striped table-boarded"}>
            <thead className={"thead-dark"}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{renderedAccounts}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
