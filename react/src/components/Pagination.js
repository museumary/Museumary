
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

    componentDidMount() {
        this.buildButtonText(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const { page, numPages } = this.props;
        const { nextPage, nextNumPages } = nextProps;

        if(page !== nextPage || numPages !== nextNumPages ) {
            this.buildButtonText(nextProps);
        }
    }

    changePage(pageNumber) {
        if(1 <= pageNumber && pageNumber  <= this.props.numPages) {
            this.props.changePage(pageNumber);
        }
    }

    buildButtonText(props) {
        const { page, numPages, range, half } = props

        let minPage = page-half, maxPage = page+half;

        if(page < 3) {
            minPage = 1
            maxPage = Math.min(minPage+range, numPages)
        }
        else if(page > numPages - 2) {
            maxPage = numPages;
            minPage = Math.max(maxPage-range, 1)
        }

        this.setState({ buttonText: Array.from(new Array(maxPage-minPage + 1), (_, i) => i + minPage) });
    }

    render() {
        const { page, numPages } = this.props

        const buttonText = this.state.buttonText.map(number => {
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

        return (
            <ul>
                <button type="button" onClick={() => this.changePage(1)} key={"<<"}>{"<<"}</button>
                <button type="button" onClick={() => this.changePage(page - 1)} key={"<"}>{"<"}</button>
                {buttonText}
                <button type="button" onClick={() => this.changePage(page + 1)} key=">" >></button>
                <button type="button" onClick={() => this.changePage(numPages)} key=">>" >>></button>
            </ul>
        );
    };
}

Pagination.defaultProps = defaultProps
export default Pagination
