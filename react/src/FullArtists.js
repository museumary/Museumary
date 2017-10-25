import React from 'react';

class FullArtists extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentWillMount(){
  	fetch(`http://museumary.me/api/artist`)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }
  render() {
  	return(
      <div className="FullArtists">
        This is where the artists will go
      </div>
   )
  }
}

export default FullArtists;
