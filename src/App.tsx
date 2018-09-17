import * as React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import { Navigation } from "./components/stateless/navigation";
import { ApplicationRoutes } from "./components/stateless/routes";


class App extends React.Component {
  public render() {
    return (
      <div>
        <Navigation />

        <ApplicationRoutes />
      </div>
    );
  }
}

export default App;
