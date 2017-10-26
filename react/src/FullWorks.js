import React from 'react';
import { Link } from 'react-router-dom';

class FullWorks extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://museumary.me/api/work`)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
		if(this.state.items.objects){
			var arr = [];
			this.state.items.objects.forEach(function(obj) {
				arr.push(obj);
			});
			return <div className="FullWorks">
							{
								arr.map(
									function(obj) {
                    var url = '/works/' + obj.id;
										return <div><Link to={url} activeClassName="active">{obj.name}</Link><br/><br/></div>;
									}
								)
							}
						</div>;
		}
		else {
			return <div className="FullWorks"></div>;
		}
	}
}

export default FullWorks;
