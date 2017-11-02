import React from 'react';
import { Link } from 'react-router-dom';

import Harvard from './static/images/Harvard.jpg';
import iHarvard from './static/images/Harvard_interior.jpg';

import Cooper from './static/images/Cooper.jpg';
import iCooper from './static/images/Cooper_interior.jpg';

import Auckland from './static/images/Auckland.jpg';
import iAuckland from './static/images/Auckland_interior.jpg';

import Finnish from './static/images/Finnish.jpg';
import iFinnish from './static/images/Finnish_interior.jpg';

import Walters from './static/images/Walters.jpg';
import iWalters from './static/images/Walters_interior.jpg';

class Venue extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const venue_id = parseInt(this.props.match.params.number, 10)
		this.setState({work_arr: []});
  	fetch(`http://api.museumary.me/venue/` + venue_id)
 		.then(result=>result.json())
    .then(items=> {
			this.setState({items})


			for (var i = 0, len = items.work_ids.length; i < len; i++) {
				fetch('http://api.museumary.me/work/' + items.work_ids[i])
				.then(result=>result.json())
				.then(responseJson=>this.setState({work_arr: this.state.work_arr.concat([responseJson])}))
			}
		})
  }


  render() {
    var venue_obj = this.state.items;
		var work_list = this.state.work_arr;
		if(venue_obj && work_list && work_list.length > 0){
      //  Do all React code within this div. 'Venue_obj' is the object that
      //  associated with this Venue page, you should be able to access it
      //  like any other JSON

      //Google Maps
      var parameters = "&maptype=satellite&zoom=19";
      var street = "";
      if(venue_obj.street)
        street = venue_obj.street.replace(/ /g, "+");
      var add =  street + "," + venue_obj.city + "," + venue_obj.country;
      var map_location = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAEh4yg0EoQBAqs3ieHnEPCD_ENLeYKUwM&q=" + add + parameters;

      //Museum Images
      var url ="";
      var iurl = "";
      if(venue_obj.name === "Harvard Art Museum")
      {
        url = Harvard;
        iurl = iHarvard;
      }
      else if(venue_obj.name === "Auckland Museum")
      {
        url = Auckland;
        iurl = iAuckland;
      }
      else if(venue_obj.name === "Finnish National Gallery")
      {
        url = Finnish;
        iurl = iFinnish;
      }
      else if(venue_obj.name === "The Walters Art Museum")
      {
        url = Walters;
        iurl = iWalters;
      }
      else {
        url = Cooper;
        iurl = iCooper;
      }
			return <div className="Venue">
              <h1>{venue_obj.name}</h1>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <img src={ url } width="500" height="300"/>
                  </div>
                  <div className="col-md-6">
                    <img src={ iurl } width="500" height="300"/>
                  </div>
                </div>
              </div>
              <br/>
              <br/>
              <iframe width="800" height="600" frameborder="0" src={ map_location } allowfullscreen align="center"></iframe><br/>
              <p><strong>Address:</strong> {venue_obj.street} {venue_obj.city} {venue_obj.country}</p><br/><br/>
							{
								work_list.map(
									function(obj) {
										var url = '/works/' + obj.id;
										return <div><Link to={url} activeClassName="active">{obj.name}</Link><br/><br/></div>;
									}
								)
							}
						</div>;
		}
		else {
			return <div className="Venue"></div>;
		}
	}
}

export default Venue;
