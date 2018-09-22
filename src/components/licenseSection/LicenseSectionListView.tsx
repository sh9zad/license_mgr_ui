import * as React from "react";
// import { LicenseApis } from "../../api";
import { ILicenseSection } from "../../models";

interface ILicenseSectionListState {
  licenseSections: ILicenseSection[];
}

export class LicenseSectionListView extends React.Component<
  {},
  ILicenseSectionListState
> {
  //   private api: LicenseApis = new LicenseApis();

  public render() {
    return (
      <div className={"row"}>
        <h3>List License Segment</h3>
      </div>
    );
  }
}
