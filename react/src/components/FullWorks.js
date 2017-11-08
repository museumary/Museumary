import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail'
import Pagination from './Pagination'

const defaultProps = {
    initialPage: 1,
    entries_per_page: 16,
    url: 'http://api.museumary.me/work?'
}

class FullWorks extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items: [],
            page: 1,
            numPages: 0,
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
                    this.setState({ items: items, page: pageNumber, numPages: numPages })
                })
        );
    }

    render() {
        if(this.state.items.objects){
            var arr = [];
            this.state.items.objects.forEach(function(obj) {
                const url = '/works/'+obj.id
                const name = obj.name.substring(0, 25) + (obj.name.length > 25 ? '...': '')
                arr.push(<Thumbnail name={name} image_url={obj.image_url} url={url} key={obj.id} />);
            });

            return (
                <div className="FullWorks">
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
                        loadPage={this.loadPage}
                    />
                </div>
            );
        }
        else {
            return <div className="FullWorks"></div>;
        }
    }
}

FullWorks.defaultProps = defaultProps

export default FullWorks;
