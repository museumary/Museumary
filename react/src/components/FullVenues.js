import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail'
import {VenuesPage} from './Pages'
import {VenuesFilter} from './Filters'

import Harvard from '../static/images/Harvard.jpg';
import Cooper from '../static/images/Cooper.jpg';
import Auckland from '../static/images/Auckland.jpg';
import Finnish from '../static/images/Finnish.jpg';
import Walters from '../static/images/Walters.jpg';

const MUSEUMS = [Harvard, Walters, Auckland, Cooper, Finnish]

const defaultProps = {
    params: {
        order_by: "name",
        order: "ascending",
        startswith: "",
        country: ""
    }
}

class FullVenues extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            params: this.props.params,
        };

        this.changePage = this.changePage.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    componentDidMount() {
        this.setState({ params: this.props.params })
    }

    changePage(pageNumber) {
        let params = Object.assign({}, this.state.params);
        params.page = pageNumber;

        this.setState({ params: params });
    }

    applyFilter(newParams) {
        console.log(newParams);
        console.log(this.state.params);

        let params = Object.assign({}, this.state.params);

        for(var param in newParams) {
            params[param] = newParams[param]
        }

        this.setState({ params: params })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const params = this.state.params;
        const newParams = nextState.params;

        for(var param in params) {
            if(params[param] !== newParams[param]) {
                return true;
            }
        }

        return false;
    }

    render() {
            return (
                <div className="FullVenues">
                    <VenuesFilter
                        applyFilter={this.applyFilter}
                    />
                    <VenuesPage
                        params={this.state.params}
                        changePage={this.changePage}
                    />
                </div>
            );
    }
}

FullVenues.defaultProps = defaultProps;

export default FullVenues;
