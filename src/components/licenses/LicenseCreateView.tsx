import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ILicense, IProduct, IAccount } from "../../models";
import { Helpers } from "../../helpers/helpers";

interface ILicenseCreateViewState {
  license?: ILicense;
  products?: IProduct[];
  accounts?: IAccount[];
  module?: string;
  _id?: string;
}

export class LicenseCreateView extends React.Component<
  RouteComponentProps<any>,
  ILicenseCreateViewState
> {
  public state: ILicenseCreateViewState = {};

  public componentDidMount(): void {
    const pathSegments = Helpers.getURLSegments(this.props.location.pathname);
    if (pathSegments.length === 5) {
      this.setState({
        ...this.state,
        _id: pathSegments[pathSegments.length - 1],
        module: pathSegments[pathSegments.length - 2]
      });
    }
  }

  public render() {
    return (
      <div>
        <h1>Create License</h1>
        <div className={"row justify-content-md-center"}>
          <div className={"col-2"}>Product</div>
          <div className={"col-3"}>
            <select className={"form-control"}>
              <option value={0}> Select </option>
            </select>
          </div>

          <div className={"col-2"}>License Options</div>
          <div className={"col-3"}>
            <select className={"form-control"} multiple={true}>
              <option value={0}> Select </option>
            </select>
          </div>
        </div>

        <div className={"row  justify-content-md-center"}>
          <div className={"col-2"}>Account</div>
          <div className={"col-3"}>Account Name</div>
        </div>

        <div className={"row  justify-content-md-center"}>
          <button className={"btn btn-success"}>
            <span className="fa fa-save" /> Generate License
          </button>
        </div>
      </div>
    );
  }
}
