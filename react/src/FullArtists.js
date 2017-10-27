import React from 'react';
import { Link } from 'react-router-dom';

class FullArtists extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://api.museumary.me/artist`)
 		.then(result=>result.json())
    .then(items=> {
			this.setState({items})
			this.setState({vararray: []})

			items.work_ids.forEach(function(work) {
				fetch('http://api.museumary.me/work/' + work.id)
		    .then(result=>result.json())
		    .then(responseJson=>this.setState({
					artist: this.state.vararray.concat([responseJson])
				}))
			})
		})
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
