import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { ProductAddNew } from "../products/productAddNew";
import { ProductListView } from "../products/productListView";
import { ProductEditView } from "../products/productEditView";
import { AccountAddNew, AccountDetailView, AccountEditView, AccountListView } from "../accounts"

export class ApplicationRoutes extends React.Component<object, object> {
    public render() {
        return (
            <Switch>
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
                <Route
                    pathMatch="full"
                    path={"/product"}
                    component={ProductListView}
                />

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
                <Route
                    pathMatch="full"
                    path={"/account"}
                    component={AccountListView}
                />
            </Switch>
        );
    }
}