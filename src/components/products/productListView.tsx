import * as React from 'react';
import { IProduct } from '../../models/Product';


interface IState {
  products: IProduct[]
}

export class ProductListView extends React.Component<{}, IState> {

  public state: IState = {
    products: []
  }

  public componentDidMount(): void {
    fetch('http://localhost:3030/product')
      .then(response => response.json())
      .then((data: any) => this.setState({ products: data }));
  }

  public render() {
    const { products } = this.state;
    const renderedProducts = products.map(product =>
      <div
        key={product._id}
        className="row"
      >
        <h3 className='col-3'>{product.name}</h3>
        <ul className='col-8'>
          <li>{product._id}</li>
          <li>{product.code}</li>
          <li>{product.salt}</li>
          <li>{product.created_date}</li>
        </ul>
        <br />
      </div>
    )
    return (
      <div className="hello">
        <div className="greeting">
          {renderedProducts}
        </div>
      </div>
    );
  }
}
