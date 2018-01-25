/*
    Pagination component that renders buttons and signals a change page request
*/

import React, { Component } from 'react';
import 'static/css/Pagination.css'

const defaultProps = {
    page: 1,
    numPages: 1,
    range: 4,
    half: 2
};

class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = { buttonText: [] }
    }

    /* Build default button text on initial component mount */
    componentDidMount() {
        this.buildButtonText(this.props)
    }

    /* Rebuild the button text when changing the page */
    componentWillReceiveProps(nextProps) {
        const { page, numPages } = this.props;
        const { nextPage, nextNumPages } = nextProps;

        if(page !== nextPage || numPages !== nextNumPages ) {
            this.buildButtonText(nextProps);
        }
    }

    /* Change the page only if the new page is within valid boundaries */
    changePage(pageNumber) {
        if(1 <= pageNumber && pageNumber  <= this.props.numPages) {
            this.props.changePage(pageNumber);
        }
    }

    /* Build 5 or less buttons */
    buildButtonText(props) {
        const { page, numPages, range, half } = props

        let minPage = page-half, maxPage = page+half;

        if (page < 3) {
            // If the active page is less than 3, the page range is from 1-numPages
            minPage = 1
            maxPage = Math.min(minPage+range, numPages)
        }
        else if (page > numPages - 2) {
            // If the active page is close to the end.
            // The page range is numPages - 2 - numPages
            maxPage = numPages;
            minPage = Math.max(maxPage-range, 1)
        }

        let buttonText = Array.from(new Array(maxPage - minPage + 1), (_, i) => i + minPage).map(number => {
            return (
                <button
                    type='button'
                    className={number === page ? 'active': ''}
                    onClick={() => this.changePage(number)}
                    key={number}>
                    {number}
                </button>
            );
        })

        this.setState({ buttonText })
    }

    render() {
        const { page, numPages } = this.props

        return (
            <ul>
                <button type="button" onClick={() => this.changePage(1)} key={"<<"}>{"<<"}</button>
                <button type="button" onClick={() => this.changePage(page - 1)} key={"<"}>{"<"}</button>
                {this.state.buttonText}
                <button type="button" onClick={() => this.changePage(page + 1)} key=">" >></button>
                <button type="button" onClick={() => this.changePage(numPages)} key=">>" >>></button>
            </ul>
        );
    };
}

Pagination.defaultProps = defaultProps
export default Pagination
