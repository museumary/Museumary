import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail'
import Pagination from './Pagination'

class FullArtists extends React.Component {
    static defaultProps = {
        initialPage: 1,
        entries_per_page: 16,
        url: 'http://api.museumary.me/artist'
    }

    constructor() {
        super();
        this.state={
            items: [],
            displayItems: [],
            activePage: 1,
            numPages: 0,
            loading: true
        };
    }

    componentDidMount() {
        const num_entries = this.props.entries_per_page

        fetch(`http://api.museumary.me/artist?entries_per_page=`+num_entries)
            .then(result=>{
                return result.json()
            })
            .then(items=> {
                const numPages = items.info.num_pages;
                this.setState({ items: items, numPages: numPages })
            });
    }

    incPage = () => {
        console.log('inc page')

        if(this.state.activePage < this.state.numPages) {
            this.setState({ activePage: this.state.activePage + 1 })
        }
        else {
            console.log('not incrementing. ')
            console.log('active ' + this.state.activePage)
            console.log('numpages: ' + this.state.numPages)
        }
    };

    decPage = () => {
        console.log('dec page.')

        if(this.state.activePage > 1) {
            this.setState({ activePage: this.state.activePage - 1 })
        }
        else {
            console.log('not dec. ')
            console.log('active ' + this.state.activePage)
            console.log('numpages: ' + this.state.numPages)
        }
    };

    firstPage = () => {
        console.log('f page.')

        if(this.state.activePage != this.props.initialPage) {
            this.setState({ activePage: this.props.initialPage })
        }
        else {
            console.log('not resetting. ')
            console.log('active ' + this.state.activePage)
            console.log('numpages: ' + this.state.numPages)
        }
    };

    lastPage = () => {
        if(this.state.activePage != this.state.numPages) {
            this.setState({ activePage: this.state.numPages })
        }
        else {
            console.log('not advancing. ')
            console.log('active ' + this.state.activePage)
            console.log('numpages: ' + this.state.numPages)
        }
    };

    changePage = () => {
        console.log('c page.')
    };

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
                        activePage={this.state.activePage}
                        numPages={this.state.numPages}
                        incPage={this.incPage}
                        decPage={this.decPage}
                        firstPage={this.firstPage}
                        lastPage={this.lastPage}
                   />
               </div>
           );
        }
        else {
            return <div className="FullArtists"></div>;
        }
    }
}

export default FullArtists;
