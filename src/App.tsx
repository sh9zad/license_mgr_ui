import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import { Navigation } from "./components/stateless/navigation";
import { ProductAddNew } from "./components/products/productAddNew";
import { ProductListView } from "./components/products/productListView";
import { ProductEditView } from "./components/products/productEditView";
import { AccountListView } from "./components/accounts/accountListView";
import { AccountAddNew } from "./components/accounts/accountAddNew";
import { AccountEditView } from "./components/accounts/accountEditView";

class App extends React.Component {
  public render() {
    return (
      <div>
        <Navigation />

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
      </div>
    );
  }
}

export default App;
