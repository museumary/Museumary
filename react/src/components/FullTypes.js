import React from 'react';
import Thumbnail from './Thumbnail'
import Pagination from './Pagination'
import TypesPage from './TypesPage'
import TypesFilter from './TypesFilter'
import style from './Select.css'

const defaultProps = {
    params: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        medium: ""
    }
}

class FullTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.params;

        this.changePage = this.changePage.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    changePage(pageNumber) {
        this.setState({ page: pageNumber });
    }


    applyFilter(newState) {
        let state = Object.assign({}, this.state);

        for(var param in newState) {
            state[param] = newState[param]
        }

        this.setState(state)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const state = this.state;

        for(var param in state) {
            if(state[param] !== nextState[param]) {
                return true;
            }
        }

        return false;
    }

    render() {
        return (
            <div className="FullTypes">
                <TypesFilter
                    applyFilter={this.applyFilter}
                />
                <TypesPage
                    params={this.state}
                    changePage={this.changePage}
                />
            </div>
        );
    }
}

FullTypes.defaultProps = defaultProps

export default FullTypes;
