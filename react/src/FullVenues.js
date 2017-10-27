import React from 'react';
import { Link } from 'react-router-dom';

class FullVenues extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://api-dot-organic-area-180723.appspot.com/venue`)
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
														<img src={obj.image_url} alt={obj.name} width="200" height="300"/><br/><br/>
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
