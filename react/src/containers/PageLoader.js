

import React, { Component } from 'react';
import Loader from 'components/Loader';
import Pagination from 'components/Pagination';

var PageLoader = (Parser, Filter) => class extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, info: {}, objects: [] }
    }

    componentWillReceiveProps(nextProps) {
        this.loadPage(nextProps.params);
    }

    loadPage(params) {
        this.setState({ loading: true })

        let arr = []
        for(const key in params) {
            arr.push(key+'='+params[key])
        }

        fetch(this.props.base_url+arr.join('&'))
            .then(result=>result.json())
            .then(items=> {
                const { objects, info } = items;
                this.setState({ loading: false, info: info, objects: objects })
            })
    }

    render() {
        const { objects, info } = this.state;

        return (
            <div>
                <Filter {...this.props} />
                {this.state.loading
                    ? <div> <Loader /> <br/> </div>
                    : <Parser items={objects} instance_url={this.props.instance_url}/> }
                <Pagination page={info.page} numPages={info.num_pages} changePage={this.props.changePage} />
            </div>
        );
    }
}

export default PageLoader;
