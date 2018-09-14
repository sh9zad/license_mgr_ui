import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export class Navigation extends Component<object, object> {
  public render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className={"navbar-nav mr-auto"}>
          <li className={"nav-item"}>
            <Link className={"nav-link"} to={"/product"}>
              {"Product"}
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
