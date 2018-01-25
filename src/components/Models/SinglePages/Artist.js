/*
    Single Artist Page that fetches its instance from the api and renders it

    Fetches every single work instance of that artist also and builds a
    Carousel of max 10 items
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

class Artist extends Component {
    constructor() {
        super();
        this.state = { items: [], work_arr: [] };
    }

    /* Fetches the data from our database and parses it accordingly */
    componentDidMount() {
        const artist_id = parseInt(this.props.match.params.number, 10)

        fetch(`http://api.museumary.me/artist/` + artist_id)
            .then(result=>result.json())
            .then(items=> {
                this.setState({ items })

                for (var i = 0, len = items.work_ids.length; i < len; i++) {
                    fetch('http://api.museumary.me/work/' + items.work_ids[i])
                        .then(result=>result.json())
                        .then(responseJson=>this.setState({work_arr: this.state.work_arr.concat([responseJson])}))
                }
            })
    }

    /* Builds 10 or less Carousel Items with and links */
    buildCarouselItems() {
        return (
            this.state.work_arr.slice(0, 10).map(function (obj) {
                return (
                    <Carousel.Item key={obj.id}>
                        <div>
                            <Link to={'/works/' + obj.id} activeClassName='active'>
                                <img className="workimage" src={obj.image_url} alt={obj.name} width="350" height="350" />
                            </Link>
                        </div>
                        <Carousel.Caption>
                            <p>{obj.name}</p>
                            <p>{obj.date}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })
        );
    }

    render() {
        var artist_obj = this.state.items;
        var work_list = this.state.work_arr;

        if(artist_obj && work_list && work_list.length > 0) {
            //  Do all React code within this div. 'artist_obj' is the object that
            //  associated with this artist page, you should be able to access it
            //  like any other JSON

            // Life and death of artist
            const life = artist_obj.birth + " (" + artist_obj.birthplace + ")";
            const death = artist_obj.death ? artist_obj.death + '(' + artist_obj.deathplace + ')' : '???';

            // Image url of the artist or the first work if there's no image
            const image_url = artist_obj.image_url || work_list[0].image_url;

            // List of works
            let works = work_list.map(function(obj) {
                let url = '/works/' + obj.id
                return <div key={obj.id} ><Link to={url} >{obj.name}</Link><br/></div>;
            })

            return (
                <div className="Artist">
                    <h1>{artist_obj.name}</h1><br/>
                    <img
                        src={image_url} alt={artist_obj.name}
                        className="artistimg"
                        width="auto" height="450" />
                    <br/>
                    <br/>
                    <strong> Culture: </strong>{artist_obj.culture}<br/>
                    <strong> Birth: </strong>{life}<br/>
                    <strong> Death: </strong>{death}<br/>
                    <h3><strong>Notable Works</strong></h3>
                    {
                        work_list.length > 1
                        ? // If there's more than 1 work build a carousel
                            <div className='container'>
                                <br/>
                                <div className="CarouselInstance">
                                    <Carousel>
                                        { this.buildCarouselItems() }
                                    </Carousel>
                                <br/>
                                </div>
                            </div>
                        : // If there's only 1 work load only that work
                            <Link to={'/works/' + work_list[0].id} activeClassName='active'>
                                <img
                                    className="workimage"
                                    src={work_list[0].image_url}
                                    alt={work_list[0].name}
                                    width="350" height="350" />
                            </Link>
                    }
                    {works}
                </div>
            );
        }
        else {
            return <div className="Artist"></div>;
        }
    }
}

export default Artist;
