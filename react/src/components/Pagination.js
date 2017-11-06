import React from 'react';
import { Link } from 'react-router-dom';
import style from './Pagination.css'

export default class Pagination extends React.Component {
    static defaultProps = {
        defaultButtonText: [1, 2, 3, 4, 5],
        buttonIndexs: [-2, -1, 0, 1, 2]
    };

    getPage(pageNumber) {
        if(pageNumber !== this.props.activePage &&
            1 <= pageNumber && pageNumber <= this.numPages) {
            this.props.loadPage(pageNumber)
        }
    }

    buildButtonText() {
        let {
            activePage,
            numPages,
            defaultButtonText,
            buttonIndexs
        } = this.props

        if(activePage <= 3) {
            return defaultButtonText;
        }

        if(activePage > numPages - 2) {
            activePage = numPages - 2;
        }

        return buttonIndexs.map(index => activePage+index);
    }

    render() {
        const {
            activePage,
            numPages
        } = this.props

        const buttonText = this.buildButtonText().map(number => {
            const my_class = number === this.props.activePage ? 'active': ''

            return (
                <button type='button' key={number}
                        className={my_class}
                        onClick={() => this.getPage(number)}>
                    {number}
                </button>
            );
        })

        return (
            <ul>
                <button type="button" onClick={() => this.getPage(1)}>{"<<"}</button>
                <button type="button" onClick={() => this.getPage(activePage - 1)}>{"<"}</button>
                {buttonText}
                <button type="button" onClick={() => this.getPage(activePage + 1)}>></button>
                <button type="button" onClick={() => this.getPage(numPages)}>>></button>
            </ul>
        );
    };
}
