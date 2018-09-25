import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Helpers } from "../../helpers/helpers";
import { ILicenseSection } from "../../models";

interface ILicenseSectionEditState {
  licenseSection: ILicenseSection;
}
export class LicenseSectionEditView extends React.Component<
  RouteComponentProps<any>,
  ILicenseSectionEditState
> {
  public state: ILicenseSectionEditState = {
    licenseSection: {}
  };
  private endpoint: string = "license";

  public componentDidMount(): void {
    const pathSegments = Helpers.getURLSegments(this.props.location.pathname);
    const url: string = Helpers.getURL(
      this.endpoint + "/" + pathSegments[pathSegments.length - 1]
    );

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ licenseSection: data }));
  }

  public render() {
    const { licenseSection } = this.state;
    return (
      <div>
        <h3>Edit License Section</h3>
        <div className={"row justify-content-md-center"}>
          <form className={"col-5"}>
            Name:{" "}
            <input className={"form-control"} value={licenseSection.name} />
            Type:{" "}
            <select
              className={"form-control"}
              value={licenseSection.type ? licenseSection.name : ""}
            >
              <option value={""}> - </option>
              <option value={"date"}> Date </option>
              <option value={"number"}> Number </option>
            </select>
            <button className={"btn btn-success"}>
              <span className={"fa fa-save"} /> Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}
