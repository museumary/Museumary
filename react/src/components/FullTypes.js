import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail'
import Pagination from './Pagination'

const defaultProps = {
    initialPage: 1,
    entries_per_page: 16,
    work_url: 'http://api.museumary.me/work/',
    url: 'http://api.museumary.me/art_type?'
}

class FullTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items: [],
            works: [],
            activePage: 1,
            numPages: 0,
            loading: true
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

                    let promises = []
                    items.objects.forEach((artType, index) => {
                        const work_ids = artType.work_ids;
                        const id = work_ids[Math.floor(Math.random()*work_ids.length)];

                        fetch(this.props.work_url+id)
                            .then(result=>result.json())
                            .then(item => {
                                let items = this.state.items
                                artType.image_url = item.image_url

                                items.objects[index] = artType
                                this.setState({ items: items })
                            })
                    })
                })
        );
    }

    render() {
        if(this.state.items.objects) {
            var arr = [];
            this.state.items.objects.forEach(function(obj) {
                const url = '/types/' + obj.id
                arr.push(<Thumbnail name={obj.name} image_url={obj.image_url} url={url} key={obj.id}/>)
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
