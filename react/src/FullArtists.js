import React from 'react';
import ArtistLink from './ArtistLink';

class FullArtists extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://museumary.me/api/artist`)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
		if(this.state.items.objects){
			var arr = [];
			console.log("THINGS IN OBJECTS:");
			console.log(this.state.items.objects);
			this.state.items.objects.forEach(function(obj) {
				arr.push(obj);
			});
			return <div className="FullArtists">
							{
								arr.map(
									function(obj) {
										console.log(obj.id);
										console.log(obj.name);
										return <ArtistLink id={obj.id} name={obj.name} />;
									}
								)
							}
						</div>;
		}
		else {
			return <div className="FullArtists"></div>;
		}
	}
}

export default FullArtists;
