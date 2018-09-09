import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import { ProductContainer } from './components/products/productContainer';
import { Navigation } from './components/stateless/navigation';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Navigation />

        <Switch>
          <Route pathMatch="full" path={"/product"} component={ProductContainer} />
        </Switch>

      </div>
    );
  }
}

export default App;
