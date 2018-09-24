import * as React from "react";
import { Route, Switch } from "react-router-dom";
import {
  ProductAddNew,
  ProductListView,
  ProductEditView,
  ProductDetailView
} from "../products";
import {
  AccountAddNew,
  AccountDetailView,
  AccountEditView,
  AccountListView
} from "../accounts";
import { LicenseCreateView } from "../licenses";
import { LicenseSectionCreateView } from "../licenseSection";
import { LicenseSectionEditView } from "../licenseSection/LicenseSectionEditView";

export class ApplicationRoutes extends React.Component<object, object> {
  public render() {
    return (
      <Switch>
        <Route
          pathMatch="full"
          path={"/product/details/:id"}
          component={ProductDetailView}
        />
        <Route
          pathMatch="full"
          path={"/product/edit/:id"}
          component={ProductEditView}
        />
        <Route
          pathMatch="full"
          path={"/product/new"}
          component={ProductAddNew}
        />
        <Route pathMatch="full" path={"/product"} component={ProductListView} />

        <Route
          pathMatch="full"
          path={"/account/details/:id"}
          component={AccountDetailView}
        />
        <Route
          pathMatch="full"
          path={"/account/edit/:id"}
          component={AccountEditView}
        />
        <Route
          pathMatch="full"
          path={"/account/new"}
          component={AccountAddNew}
        />
        <Route pathMatch="full" path={"/account"} component={AccountListView} />

        <Route
          pathMatch="full"
          path={"/license/section/create/:id"}
          component={LicenseSectionCreateView}
        />
        <Route
          pathMatch="full"
          path={"/license/section/edit/:id"}
          component={LicenseSectionEditView}
        />
        <Route
          pathMatch="full"
          path={"/license/create/:module/:id"}
          component={LicenseCreateView}
        />
      </Switch>
    );
  }
}
