import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail';
import Pagination from './Pagination'

const defaultProps = {
    initialPage: 1,
    entries_per_page: 16,
    url: 'http://api.museumary.me/artist?'
}

class FullArtists extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items: [],
            page: 1,
            numPages: 0,
        };

        this.changePage = this.changePage.bind(this)
    }

    componentDidMount() {
        this.changePage(this.props.initialPage)
    }

    changePage(pageNumber) {
        const num_entries = 'entries_per_page='+this.props.entries_per_page
        const page = 'page=' + pageNumber

        return (
            fetch(this.props.url+num_entries+'&'+page)
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

            return (
                <div className="FullArtists">
                    <div className="container">
                        <div className="row">
                            {arr}
                        </div>
                        <br/>
                        <br/>
                   </div>
                   <Pagination
                        page={this.state.page}
                        numPages={this.state.numPages}
                        changePage={this.changePage}
                   />
               </div>
           );
        }
        else {
            return <div className="FullArtists"></div>;
        }
    }
}

FullArtists.defaultProps = defaultProps;

export default FullArtists;
