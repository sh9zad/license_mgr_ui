import * as React from "react";
import * as moment from "moment";
import { IProduct } from "../../models/Product";
import { Link } from "react-router-dom";

interface IState {
  products: IProduct[];
}

export class ProductListView extends React.Component<object, IState> {
  public state: IState = {
    products: []
  };

  public componentDidMount(): void {
    fetch("http://localhost:3030/product")
      .then(response => response.json())
      .then((data: IProduct[]) => this.setState({ products: data }));
  }

  public render() {
    const { products } = this.state;
    const renderedProducts = products.map(product => (
      <tr key={product._id}>
        <td>{product._id}</td>
        <td>
          <Link to={"product/detail/" + product._id}>{product.name}</Link>
        </td>
        <td>{product.code}</td>
        <td>{product.salt}</td>
        <td>{moment(product.created_date).format("MM/DD/YYYY")}</td>
        <td>
          <Link
            className={"btn btn-warning"}
            to={"product/edit/" + product._id}
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
          <h2 className={"pull-left"}>Product List</h2>
          <Link className={"btn btn-success pull-right"} to={"/product/new"}>
            <span className={"fa fa-plus"} /> ADD
          </Link>
          <table className={"table table-striped table-boarded"}>
            <thead className={"thead-dark"}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Salt</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{renderedProducts}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
