/*
    Higher Order Component FullPage that serves as the base for every single
    Model Page. Its state determines the parameters for loading and pagination.
*/

import React, { Component } from 'react';
import Pagination from 'components/Pagination';

var FullPage = (_defaultProps, PageLoader) => class extends Component {
    static defaultProps = _defaultProps;

    constructor(props) {
        super(props);
        this.state = this.props.defaultParams;

        // Bind functions so it passes into PageLoader easier
        this.bindFunctions = {
            changePage: this.changePage.bind(this),
            applyFilter: this.applyFilter.bind(this)
        }
    }

    /* Only change the page if the newPage is different */
    changePage(newPage) {
        if(newPage !== this.state.page) {
            this.setState({ page: newPage });
        }
    }

    /* Filter items based on results passed in from the model filter */
    applyFilter(newParams) {
        this.setState(newParams);
    }

    /* On initial mount, render either from default params or search in url */
    componentDidMount() {
        let search = this.props.location.search;

        // If the user input some search base_url+?<some params>
        if (search) {
            // Create new param object so it doesn't modify props defaultParams
            // While props are immutable, since defaultParams is a dictionary
            // its possible to modify and it'll still pass compile check
            let myParams = Object.assign({}, this.props.defaultParams);

            // Parse search by replacing and splitting by ? and &
            // Only assign the new param if the key is a valid defaultParameter
            // by checking if it exists in our created myParams object
            search = search.replace('?', '').split('&');
            for (let i = 0, len = search.length; i < len; ++i) {
                const temp = search[i].split('=');
                if (myParams.hasOwnProperty(temp[0])) {
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
        return (
            <PageLoader
                params={this.state}
                {...this.props}
                {...this.bindFunctions} />
        );
    }
}

export default FullPage;
