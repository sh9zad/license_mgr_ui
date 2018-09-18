import * as React from "react";
import { RouteComponentProps } from "react-router";

export class LicenseCreateView extends React.Component<
  RouteComponentProps<any>,
  object
> {
  public render() {
    return (
      <div>
        <h1>Create License</h1>
      </div>
    );
  }
}
