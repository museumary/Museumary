import React from 'react';
import { Link } from 'react-router-dom';

class FullTypes extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://api.museumary.me/art_type`)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
		if(this.state.items.objects){
			var arr = [];
			this.state.items.objects.forEach(function(obj) {
				arr.push(obj);
			});
			return <div className="FullTypes">
							{
								arr.map(
									function(obj) {
                    var url = '/types/' + obj.id;
										return <div><Link to={url} activeClassName="active">{obj.name}</Link><br/><br/></div>;
									}
								)
							}
						</div>;
		}
		else {
			return <div className="FullTypes"></div>;
		}
	}
}

export default FullTypes;
