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
      <div>
        <div className={"row justify-content-md-center"}>
          <div className={"col-5"}>
            <h3>License Segments</h3>
          </div>
          <div className={"col-2"}>
            <button className={"btn btn-primary"} onClick={this.onAssignClick}>
              <span className={"fa fa-tasks"} /> Assign
            </button>
          </div>
          <div className={"col-2"}>
            <Link className={"btn btn-success"} to={"/"}>
              <span className={"fa fa-plus"} /> Create
            </Link>
          </div>
        </div>
        <div className={"row justify-content-md-center"}>
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
      </div>
    );
  }

  private onAssignClick = (): void => this.onAssignClickHandler();
  private onCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    this.onCheckBoxChangeHandler(e);

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

  private onAssignClickHandler(): void {
    const { selectedSections } = this.state;
    const urlSegments = Helpers.getURLSegments(this.props.location.pathname);
    const url: string = Helpers.getURL(
      this.endpoint +
        "/section/relate/product/" +
        urlSegments[urlSegments.length - 1]
    );

    fetch(url, {
      body: JSON.stringify(selectedSections),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(response => response.json())
      .catch(err => console.error(err));
  }

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
                to={"/license/section/edit/" + section._id}
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
