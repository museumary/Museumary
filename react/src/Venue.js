import React from 'react';

class Venue extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const venue_id = parseInt(this.props.match.params.number, 10)
  	fetch(`http://museumary.me/api/venue/` + venue_id)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
    var venue_obj = this.state.items;
		if(venue_obj){
      //  Do all React code within this div. 'Venue_obj' is the object that
      //  associated with this Venue page, you should be able to access it
      //  like any other JSON
			return <div className="Venue">
              {venue_obj.name}
						</div>;
		}
		else {
			return <div className="Venue"></div>;
		}
	}
}

export default Venue;
