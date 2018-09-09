import * as React from 'react';
import { IProduct } from '../../models/Product';
import { AlertDlg } from '../stateless/alert';

interface ISate {
    product: IProduct;
    showAlert: boolean;
    alertType: string;
    alertMessage: string;
}

export class ProductAddNew extends React.Component<{}, ISate> {

    public state: ISate = {
        alertMessage: '',
        alertType: '',
        product: {},
        showAlert: false,
    };

    public inputChangeHandler(e: React.FormEvent<HTMLInputElement>): void {
        const { product } = this.state;
        product[e.currentTarget.id] = e.currentTarget.value;
        this.setState({ product });
    }

    public closeAlertDialog() {
        this.setState({ showAlert: false, alertMessage: '' });
    };

    public formSubmitHandler() {
        const { product } = this.state;
        //tslint:disable
        console.log(product);
        fetch('http://localhost:3030/product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    this.setState({
                        alertType: 'error',
                        alertMessage: data.message,
                        showAlert: true,
                    });
                }
                else {
                    this.setState({
                        alertType: 'success',
                        alertMessage: "Product added successfully",
                        showAlert: true,
                        product: data
                    });
                }
            })
            .catch((reason: any) => {
                console.log('here');
                this.setState({
                    alertMessage: reason,
                    showAlert: true,
                });
            })

    }

    onInputChange = (e: React.FormEvent<HTMLInputElement>): void => this.inputChangeHandler(e);
    onFormSubmit = (): void => this.formSubmitHandler();
    onCloseDialog = (): void => this.closeAlertDialog();

    public render() {
        return (
            <div>
                <AlertDlg
                    level={this.state.alertType}
                    message={this.state.alertMessage}
                    visible={this.state.showAlert}
                    closeDialog={this.onCloseDialog}
                />
                <div className={"row"}>
                    <h3 className={"col-sm-10"}>Add New Product</h3>
                </div>
                <div className={"row"}>
                    <div className={"col-sm-9"}>
                        <label>Name</label>
                        <input className='form-control' id='name' type="text" onChange={this.onInputChange} />
                        <label>Code</label>
                        <input className='form-control' id='code' type="text" onChange={this.onInputChange} />
                        <label>Salt</label>
                        <input className='form-control' id='salt' type="text" onChange={this.onInputChange} />
                        <button className='btn btn-success btn-small' type='button' onClick={this.onFormSubmit}><span className='fa fa-plus' /> Save</button>
                    </div>
                </div>

            </div>
        );
    }
}