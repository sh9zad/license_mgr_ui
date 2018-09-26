import * as React from "react";
import { ILicenseSection } from "../../models";
import { Link, RouteComponentProps } from "react-router-dom";
import { Helpers } from "../../helpers/helpers";

interface ILicenseSectionListState {
  licenseSections: ILicenseSection[];
  id?: string | null;
  selectedSections: string[];
}

export class LicenseSectionListView extends React.Component<
  RouteComponentProps<any>,
  ILicenseSectionListState
> {
  public state: ILicenseSectionListState = {
    licenseSections: [],
    selectedSections: []
  };

  private endpoint: string = "license";

  public componentDidMount(): void {
    const url: string = Helpers.getURL(this.endpoint + "/section/all");
    const segments: string[] = Helpers.getURLSegments(
      this.props.location.pathname
    );

    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          id: segments[segments.length - 1],
          licenseSections: data
        })
      )
      .catch(err => {
        console.error(err);
      });
  }

  public render() {
    return (
      <div className={"row justify-content-md-center"}>
        <h3>List License Segment</h3>
        <div className={"col-10"}>
          <table className={"table table-striped table-bordered"}>
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{this.renderSections()}</tbody>
          </table>
        </div>
      </div>
    );
  }

  private onCheckBoxChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { currentTarget } = e;
    const { selectedSections } = this.state;

    if (currentTarget.checked === true) {
      selectedSections.push(currentTarget.value);
      this.setState({ selectedSections });
    } else {
      if (selectedSections.indexOf(currentTarget.value) > -1) {
        this.setState({
          selectedSections: selectedSections.filter(
            (el: string) => el !== currentTarget.value
          )
        });
      }
    }
  }

  private onCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    this.onCheckBoxChangeHandler(e);

  private renderSections(): JSX.Element[] {
    const { licenseSections } = this.state;

    return licenseSections.map(
      (section: ILicenseSection): JSX.Element => {
        return (
          <tr key={section._id}>
            <td>
              <input
                type={"checkbox"}
                className={"form-control"}
                onChange={this.onCheckBoxChange}
                value={section._id}
              />
            </td>
            <td>{section._id}</td>
            <td>{section.name}</td>
            <td>{section.type}</td>
            <td>
              <Link
                className={"btn btn-warning"}
                to={"license/edit/" + section._id}
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
        );
      }
    );
  }
}
