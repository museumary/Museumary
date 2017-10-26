import React from 'react';

class Artist extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const artist_id = parseInt(this.props.match.params.number, 10)
  	fetch(`http://museumary.me/api/artist/` + artist_id)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
    var artist_obj = this.state.items;
		if(artist_obj){
      //  Do all React code within this div. 'artist_obj' is the object that
      //  associated with this artist page, you should be able to access it
      //  like any other JSON
			return <div className="Artist">
              {artist_obj.name}
						</div>;
		}
		else {
			return <div className="Artist"></div>;
		}
	}
}

export default Artist;