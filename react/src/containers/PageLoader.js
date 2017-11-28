/*
    Higher Order PageLoader component that wraps a Parser and a Filter

    Fetches the models from the base api and sends it to the filter
    The parser will determine how the items are actually rendered
    Links the changePage from fullPage to the Pagination component
*/

import React, { Component } from 'react';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';

var PageLoader = (Parser, Filter) => class extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, info: {}, objects: [] }
    }

    /* Load next page everytime we recieve props */
    componentWillReceiveProps(nextProps) {
        this.loadPage(nextProps.params);
    }

    /* Load page based on new parameters */
    loadPage(params) {
        this.setState({ loading: true })

        let arr = []
        for(const key in params) {
            arr.push(key+'='+params[key])
        }

        // Fetch from api url of full pages with added parameters
        fetch(this.props.base_url+arr.join('&'))
            .then(result=>result.json())
            .then(items=> {
                const { objects, info } = items;
                this.setState({ loading: false, info: info, objects: objects })
            })
    }

    render() {
        const { objects, info, loading } = this.state;

        return (
            <div>
                <Filter {...this.props} />
                {loading
                    ? <div> <Loader /> <br/> </div>
                    : <Parser items={objects} instance_url={this.props.instance_url}/> }
                <Pagination page={info.page} numPages={info.num_pages} changePage={this.props.changePage} />
            </div>
        );
    }
}

export default PageLoader;
