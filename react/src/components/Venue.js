import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail';

import Harvard from '../static/images/Harvard.jpg';
import iHarvard from '../static/images/Harvard_interior.jpg';

import Cooper from '../static/images/Cooper.jpg';
import iCooper from '../static/images/Cooper_interior.jpg';

import Auckland from '../static/images/Auckland.jpg';
import iAuckland from '../static/images/Auckland_interior.jpg';

import Finnish from '../static/images/Finnish.jpg';
import iFinnish from '../static/images/Finnish_interior.jpg';

import Walters from '../static/images/Walters.jpg';
import iWalters from '../static/images/Walters_interior.jpg';

const MUSEUMS = [
    [Harvard, iHarvard],
    [Walters, iWalters],
    [Auckland, iAuckland],
    [Cooper, iCooper],
    [Finnish, iFinnish]
]

class Venue extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            venue:[],
            works:[]
        };
        this.museum_url = '';
        this.imuseum_url = '';
        this.map_location = '';
    }

    componentDidMount() {
        const venue_id = parseInt(this.props.match.params.number, 10)

        if(1 <= venue_id && venue_id <= 5) {
            let museum = MUSEUMS[venue_id-1]
            this.museum_url = museum[0]
            this.imuseum_url = museum[1]
        }

        fetch(`http://api.museumary.me/venue/` + venue_id)
            .then(result=>result.json())
            .then(venue=> {
                this.setState({ venue })

                let street = "";
                if(venue.street)
                    street = venue.street.replace(/ /g, "+");
                const add =  street + "," + venue.city + "," + venue.country;
                this.map_location = this.props.base_url + add + this.props.parameters;

                for (var i = 0, len = venue.work_ids.length; i < 4; i++) {
                    fetch('http://api.museumary.me/work/' + venue.work_ids[i])
                        .then(result=>result.json())
                        .then(responseJson=>this.setState({works: this.state.works.concat([responseJson])}))
                }
            })
    }

    render() {
        var venue_obj = this.state.venue;
        var work_list = this.state.works;

        if(venue_obj && work_list && work_list.length > 0){
            //  Do all React code within this div. 'Venue_obj' is the object that
            //  associated with this Venue page, you should be able to access it
            //  like any other JSON

            let works = work_list.map(function(obj) {
                const url = '/works/' + obj.id;
                const name = obj.name.substring(0, 25) + (obj.name.length > 25 ? '...': '')
                return (
                    <Thumbnail
                        name={name}
                        image_url={obj.image_url}
                        url={url}
                        key={obj.id}
                        details={[name, "NA", "NA"]}/>
                );
            })

            return (
                <div className="Venue">
                        <h1>{venue_obj.name}</h1>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={ this.museum_url } className="img-rounded" width="500" height="300"/>
                                </div>
                                <div className="col-md-6">
                                    <img src={ this.imuseum_url } className="img-rounded" width="500" height="300"/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>


                        <h2><strong>Gallery of Works</strong></h2><br/>
                        <div className="container">
                            <div className="row">
                                {works}
                            </div>
                            <br/>
                            <br/>
                        </div>
                        <br/>
                        <br/>
                        <iframe width="800" height="600" frameBorder="0" src={ this.map_location } allowFullScreen align="center"></iframe><br/>
                        <p><strong>Address:</strong> {venue_obj.street} {venue_obj.city} {venue_obj.country}</p><br/><br/>
                </div>
            );
        }
        else {
            return <div className="Venue"></div>;
        }
    }
}

Venue.defaultProps = {
    parameters: '&maptype=satellite&zoom=19',
    base_url: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAEh4yg0EoQBAqs3ieHnEPCD_ENLeYKUwM&q='
}

export default Venue;
