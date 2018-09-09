import * as React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import { ProductAddNew } from './components/products/productAddNew';
import { ProductListView } from "./components/products/productListView";

class App extends React.Component {
  public render() {
    return (
      <div className="container">
        <ProductAddNew />
        <br />
        <ProductListView />
      </div>
    );
  }
}

export default App;
