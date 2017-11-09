import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail';
import Pagination from './Pagination'
import ArtistsPage from './Pages/ArtistsPage'
import { ArtistsFilter } from './Filters'

const defaultProps = {
    params: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        culture: ""
    }
}

class FullArtists extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            params: this.props.params,
            numPages: 0
        };

        this.changePage = this.changePage.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.changeNumPages = this.changeNumPages.bind(this);
    }

    changePage(pageNumber) {
        let params = Object.assign({}, this.state.params);
        params.page = pageNumber;

        this.setState({ params: params });
    }

    applyFilter(newParams) {
        let params = Object.assign({}, this.state.params);

        for(var param in newParams) {
            params[param] = newParams[param]
        }

        this.setState({ params: params })
    }

    changeNumPages(numPages) {
        this.setState({ numPages: numPages })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const params = this.state.params;
        const newParams = nextState.params;

        for(var param in params) {
            if(params[param] !== newParams[param]) {
                return true;
            }
        }

        return this.state.numPages !== nextState.numPages;
    }

    render() {
        return (
            <div className="FullArtists">
                <ArtistsFilter
                    applyFilter={this.applyFilter}
                />
                <ArtistsPage
                    params={this.state.params}
                    changePage={this.changePage}
                    changeNumPages={this.changeNumPages}
                />
                <br/>
                 <Pagination
                    page={this.state.params.page}
                    numPages={this.state.numPages}
                    changePage={this.changePage}
                />
            </div>
        );
    }
}

FullArtists.defaultProps = defaultProps;

export default FullArtists;
