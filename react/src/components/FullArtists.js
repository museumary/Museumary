import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail';
import Pagination from './Pagination'

class FullArtists extends React.Component {
    constructor() {
        super();
        this.state={
            items:[],
            activePage: 1
        };
    }

    componentDidMount() {
        fetch(`http://api.museumary.me/artist?entries_per_page=24`)
            .then(result=>result.json())
            .then(items=> {
                this.setState({ items })
            });
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
                      <Pagination initialPage="1" />
               </div>
           );
        }
        else {
            return <div className="FullArtists"></div>;
        }
    }
}

export default FullArtists;
