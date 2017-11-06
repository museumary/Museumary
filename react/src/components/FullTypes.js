import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail'
import Pagination from './Pagination'

const defaultProps = {
    initialPage: 1,
    entries_per_page: 16,
    url: 'http://api.museumary.me/art_type?'
}

class FullTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items: [],
            activePage: 1,
            numPages: 0
        };

        this.loadPage = this.loadPage.bind(this)
    }

    componentDidMount() {
        this.loadPage(this.props.initialPage)
    }

    loadPage(pageNumber) {
        const num_entries = 'entries_per_page='+this.props.entries_per_page
        const page = 'page=' + pageNumber

        return (
            fetch(this.props.url+num_entries+'&'+page)
                .then(result=>result.json())
                .then(items=> {
                    const numPages = items.info.num_pages;
                    this.setState({ items: items, activePage: pageNumber, numPages: numPages })
                })
        );
    }

    render() {
        if(this.state.items.objects){
            var arr = [];

            this.state.items.objects.forEach(function(obj) {
                const url = '/types/' + obj.id
                arr.push(<Thumbnail name={obj.name} url={url} key={obj.id}/>)
            });
            return (
                <div className="FullTypes">
                    <div className="container">
                        <div className="row">
                            {arr}
                        </div>
                        <br/>
                        <br/>
                    </div>
                    <Pagination
                        activePage={this.state.activePage}
                        numPages={this.state.numPages}
                        loadPage={this.loadPage}
                    />
                </div>
            );
        }
        else {
            return <div className="FullTypes"></div>;
        }
    }
}

FullTypes.defaultProps = defaultProps

export default FullTypes;
