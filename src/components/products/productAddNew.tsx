import * as React from 'react';
import { IProduct } from '../../models/Product';

interface ISate {
    product: IProduct;
}

export class ProductAddNew extends React.Component<{}, ISate> {

    public state = {
        product: {}
    };

    public inputChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
        const { product } = this.state;
        product[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ product });
    }

    public formSubmitHandler() {
        const { product } = this.state;
        //tslint:disable
        console.log(product);
        fetch('http://localhost:3030/product', {
            method: 'POPST',
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ product: data });
            })
    }

    onInputChange = (e: React.FormEvent<HTMLInputElement>): void => this.inputChangeHandler(e);
    onFormSubmit = (): void => this.formSubmitHandler();

    public render() {
        return (
            <div className='row'>
                <h3 className='col-2'>Add New Product</h3>
                <div className='col-10'>
                    <label>Name</label>
                    <input className='form-control' id='name' type="text" onChange={this.onInputChange} />
                    <label>Code</label>
                    <input className='form-control' id='code' type="text" onChange={this.onInputChange} />
                    <label>Salt</label>
                    <input className='form-control' id='salt' type="text" onChange={this.onInputChange} />
                    <button className='btn btn-success btn-small' type='button' onClick={this.onFormSubmit}><span className='fa fa-plus' /> Save</button>
                </div>

            </div>
        );
    }
}