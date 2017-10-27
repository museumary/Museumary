import React from 'react';
import { Link } from 'react-router-dom';

class FullVenues extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://api.museumary.me/venue`)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
		if(this.state.items.objects){
			var arr = [];
			this.state.items.objects.forEach(function(obj) {
				arr.push(obj);
			});
			return <div className="FullVenues">
						<div className="container">
							<div className="row">
								{
									arr.map(
										function(obj) {
	                    					var url = '/venues/' + obj.id;
											return <div className="col-md-3">
														<Link to={url} activeClassName="active">{obj.name}</Link>
														<br/>
														<br/>
													</div>;
										}
									)
								}
							</div>
							<br/>
							<br/>
						</div>
					</div>;
		}
		else {
			return <div className="FullVenues"></div>;
		}
	}
}

export default FullVenues;
