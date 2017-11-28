
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from 'components/Thumbnail';

/* Import Venue Images */
import Harvard from 'static/images/Harvard.jpg';
import Walters from 'static/images/Walters.jpg';
import Auckland from 'static/images/Auckland.jpg';
import Cooper from 'static/images/Cooper.jpg';
import Finnish from 'static/images/Finnish.jpg';

/* Import Interior Images  */
import iHarvard from 'static/images/Harvard_interior.jpg';
import iWalters from 'static/images/Walters_interior.jpg';
import iAuckland from 'static/images/Auckland_interior.jpg';
import iCooper from 'static/images/Cooper_interior.jpg';
import iFinnish from 'static/images/Finnish_interior.jpg';

/*
    Build MUSEUMS Array with corresponding Image and Name
    The Name will be used as a parameter to search in the FullWorks Page to get
    all instances of the work in that venue
*/
const MUSEUMS = [
    [Harvard, iHarvard, 'Harvard+Art+Museum'],
    [Walters, iWalters, 'The+Walters+Art+Museum'],
    [Auckland, iAuckland, 'Auckland+Museum'],
    [Cooper, iCooper, 'Cooper+Hewitt,+Smithsonian+Design+Museum'],
    [Finnish, iFinnish, 'Finnish+National+Gallery']
];

const PARAMETERS = '&maptype=satellite&zoom=19';
const BASE_URL = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAEh4yg0EoQBAqs3ieHnEPCD_ENLeYKUwM&q=';

class Venue extends Component {
    constructor() {
        super();
        this.state = { venue: [], works: [] };

        this.museum_url = '';
        this.imuseum_url = '';
        this.map_location = '';
        this.museum_name = '';
    }

    /* Fetches the data from our database and parses it accordingly */
    componentDidMount() {
        const venue_id = parseInt(this.props.match.params.number, 10)

        if(1 <= venue_id && venue_id <= 5) {
            const museum = MUSEUMS[venue_id - 1]

            this.museum_url = museum[0];
            this.imuseum_url = museum[1];
            this.museum_name = museum[2];
        }

        fetch(`http://api.museumary.me/venue/` + venue_id)
            .then(result=>result.json())
            .then(venue=> {
                this.setState({ venue })

                let add = [
                    // Format Street if there is one, empty otherwise
                    venue.street ? venue.street.replace(/ /g, '+') : '',
                    venue.city,
                    venue.country
                ];

                this.map_location = BASE_URL + add.join(',') + PARAMETERS;

                for (let i = 0; i < 4; i++) {
                    fetch('http://api.museumary.me/work/' + venue.work_ids[i])
                        .then(result => result.json())
                        .then(responseJson => this.setState({works: this.state.works.concat([responseJson])}))
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

            // Create 4 Work Thumbnails
            let works = work_list.map(function(obj) {
                obj.url = '/works/' + obj.id;
                obj.name = obj.name.substring(0, 25) + (obj.name.length > 25 ? '...': '')
                obj.details = [obj.name, 'N/A', 'N/A'];

                return <Thumbnail key={obj.id} {...obj} />;
            })

            return (
                <div className="Venue">
                    {/* Venue Name and Base / Interior Images */}
                    <h1>{venue_obj.name}</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img src={ this.museum_url } alt="Harvard" className="img-rounded" width="500" height="300"/>
                            </div>
                            <div className="col-md-6">
                                <img src={ this.imuseum_url } alt="Harvard Interior" className="img-rounded" width="500" height="300"/>
                            </div>
                        </div>
                    </div>

                    {/* 4 Works Gallery and link to FullPage */}
                    <Link to={'/works?venue='+this.museum_name}><h2><strong>Gallery of Works</strong></h2></Link><br/>
                    <div className="container">
                        <div className="row">
                            {works}
                        </div>
                    </div>
                    <br />

                    {/* Map */}
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

export default Venue;
