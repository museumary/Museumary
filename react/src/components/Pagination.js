import React from 'react';
import { Link } from 'react-router-dom';
import style from './Pagination.css'

export default class Pagination extends React.Component {
    static defaultProps = {
        defaultButtonText: [1, 2, 3, 4, 5],
        buttonIndexs: [-2, -1, 0, 1, 2]
    };

    render() {
        let buttonText = []
        let baseNumber = this.props.activePage

        if(baseNumber < 3) {
            buttonText = this.props.defaultButtonText
        }
        else {
            if(baseNumber > this.props.numPages - 2) {
                baseNumber = this.props.numPages - 2;
            }

            buttonText = this.props.buttonIndexs.map(index => baseNumber+index)
        }

        buttonText = buttonText.map(number => {
            const my_class = number === this.props.activePage ? 'active': ''

            return (
                <button type='button' key={number} className={my_class}>
                    {number}
                </button>
            );
        })

        return (
            <ul>
                <button type="button" onClick={this.props.firstPage}>{"<<"}</button>
                <button type="button" onClick={this.props.decPage}>{"<"}</button>
                {buttonText}
                <button type="button" onClick={this.props.incPage}>></button>
                <button type="button" onClick={this.props.lastPage}>>></button>
            </ul>
        );
    };
}
