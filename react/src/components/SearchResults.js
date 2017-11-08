import React from 'react';
import {Link} from 'react-router-dom';
import style from './Full.css'
import Thumbnail from './Thumbnail';
import Pagination from './Pagination';

const defaultProps = {
    initialPage: 1,
    entries_per_page: 16,
    url: 'http://api.museumary.me/search?'
}

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items: [],
            page: 1,
            numPages: 0,
        };

        this.changePage = this.changePage.bind(this)
    }
    componentDidMount(){
        // http://api.museumary.me/search/alb?page=1&entries_per_page=16 < example query
        this.changePage(this.props.initialPage)
    }

    changePage(pageNumber) {
        const num_entries = 'entries_per_page='+this.props.entries_per_page
        const page = 'page=' + pageNumber
        const query = 'query=' + this.props.location.state.search

        console.log(this.props.url+query+'&'+page+'&'+num_entries);
        return (
            fetch(this.props.url+query+'&'+page+'&'+num_entries)
                .then(result=>result.json())
                .then(items=> {
                    const numPages = items.info.num_pages;
                    this.setState({ items: items, page: pageNumber, numPages: numPages })
                })
        );
    }


    render() {
        if(this.state.items.objects){
            var arr = [];
            this.state.items.objects.forEach(function(obj) {
                const url = '/artists/' + obj.id
                arr.push(<Thumbnail name={obj.name} image_url={obj.image_url} url={url} key={obj.id} />);
            });

            if(arr.length === 0) {
                return <div>No search results for {this.props.location.state.search}</div>;
            }
            return (
                <div className="SearchResults">
                    <div className="container">
                        <div className="row">
                            {arr}
                        </div>
                        <br/>
                        <br/>
                   </div>
                   <Pagination
                        page={this.state.page}
                        numPages={this.state.items.info.num_pages}
                        changePage={this.changePage}
                   />
               </div>
           );
        }
        else {
            return <div>Searching for {this.props.location.state.search}...</div>;
        }
    }
}

SearchResults.defaultProps = defaultProps;

export default SearchResults;
