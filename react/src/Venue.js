import React from 'react';

class Venue extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const venue_id = parseInt(this.props.match.params.number, 10)
  	fetch(`http://api.museumary.me/venue/` + venue_id)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
    var venue_obj = this.state.items;
		if(venue_obj){
      //  Do all React code within this div. 'Venue_obj' is the object that
      //  associated with this Venue page, you should be able to access it
      //  like any other JSON
      var parameters = "&maptype=satellite&zoom=19";
      var add = venue_obj.street.replace(/, /g, "");
      add = add.replace(/ /g, "+");
      var map_location = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAEh4yg0EoQBAqs3ieHnEPCD_ENLeYKUwM&q=" + add + parameters;
			return <div className="Venue">
              <h1>{venue_obj.name}</h1>
              <iframe width="500" height="300" frameborder="0" style="border:0" src={ map_location } allowfullscreen align="center"></iframe>
						</div>;
		}
		else {
			return <div className="Venue"></div>;
		}
	}
}

export default Venue;
