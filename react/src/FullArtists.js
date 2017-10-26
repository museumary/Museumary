import React from 'react';
import { Link } from 'react-router-dom';

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
			this.state.items.objects.forEach(function(obj) {
				arr.push(obj);
			});
			return <div className="FullArtists">
							{
								arr.map(
									function(obj) {
										var url = '/artists/' + obj.id;
										return <div><Link to={url} activeClassName="active">{obj.name}</Link><br/></div>;
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
