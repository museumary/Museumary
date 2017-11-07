import React from 'react';
import {Link} from 'react-router-dom';

class SearchResults extends React.Component {
    constructor() {
        super();
        this.state={
            query: ""
        };
    }
    componentDidMount(){
    }


    render() {
        return <div>No search results for {this.props.location.state.search}</div>
    }
}

export default SearchResults;
