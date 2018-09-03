import * as React from 'react';
import { Component } from 'react';

export interface IAlertDlgProps {
    level: string;
    message: string;
    visible: boolean;
    closeDialog: () => void;
}

export class AlertDlg extends Component<IAlertDlgProps, object> {

    public onDismissClicked = () => {
        console.log('somwthing');
    };

    public render() {
        return (
            <div className={this.getClass()} role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.closeDialog}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3>{this.props.message}</h3>
            </div>
        )
    }

    private getClass(): string {
        let classNames: string = "alert fade show alert-dismissible";

        if (this.props.level === "error") {
            classNames = classNames + " alert-danger";
        }
        else if (this.props.level === 'success') {
            classNames = classNames + " alert-success";
        }

        if (this.props.visible === false) {
            classNames = classNames + " d-none"
        }

        return classNames;
    };

}