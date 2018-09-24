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
    return (
      <div>
        <h3>Edit License Section</h3>
      </div>
    );
  }
}
