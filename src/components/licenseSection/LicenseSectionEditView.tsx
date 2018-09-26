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

  public inputChangeHandler(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void {
    const { licenseSection } = this.state;
    licenseSection[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ licenseSection });
  }

  public formSubmitHandler() {
    const { licenseSection } = this.state;

    const url: string = Helpers.getURL(
      this.endpoint + "/section/" + licenseSection._id
    );

    fetch(url, {
      body: JSON.stringify(licenseSection),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => this.inputChangeHandler(e);
  public onFormSubmit = (): void => this.formSubmitHandler();

  public render() {
    const { licenseSection } = this.state;
    return (
      <div>
        <h3>Edit License Section</h3>
        <div className={"row justify-content-md-center"}>
          <div className={"col-10"}>
            Name:{" "}
            <input
              id={"name"}
              className={"form-control"}
              onChange={this.onInputChange}
              defaultValue={licenseSection.name}
            />
            Type:{" "}
            <select
              id={"type"}
              className={"form-control"}
              onChange={this.onInputChange}
              value={licenseSection.type ? licenseSection.type : ""}
            >
              <option value={""}> - </option>
              <option value={"date"}> Date </option>
              <option value={"number"}> Number </option>
              <option value={"string"}> String </option>
            </select>
            <button className={"btn btn-success"} onClick={this.onFormSubmit}>
              <span className={"fa fa-save"} /> Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}
