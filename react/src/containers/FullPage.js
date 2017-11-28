
import React, { Component } from 'react';
import Pagination from 'components/Pagination';

var FullPage = (_defaultProps, PageLoader) => class extends Component {
    static defaultProps = _defaultProps;

    constructor(props) {
        super(props);
        this.state = this.props.defaultParams;

        this.bindFunctions = {
            changePage: this.changePage.bind(this),
            applyFilter: this.applyFilter.bind(this)
        }
    }

    changePage(pageNumber) {
        if(pageNumber !== this.state.page) {
            this.setState({ page: pageNumber });
        }
    }

    applyFilter(newParams) {
        this.setState(newParams);
    }

    componentDidMount() {
        let search = this.props.location.search;

        if(search) {
            let myParams = Object.assign({}, this.props.defaultParams);

            search = search.replace('?', '').split('&');
            for(let i = 0, len = search.length; i < len; ++i) {
                let temp = search[i].split('=');
                if(myParams.hasOwnProperty(temp[0])) {
                    myParams[temp[0]] = temp[1];
                }
            }

            this.setState(myParams);
        }
        else {
            this.setState(this.props.defaultParams);
        }

    }

    render() {
        const newProps = {...this.props, ...this.bindFunctions}

        return <PageLoader params={this.state} {...newProps} />
    }
}

export default FullPage;
