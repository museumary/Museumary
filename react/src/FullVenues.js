import React from 'react';

class FullVenues extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://museumary.me/api/venue`)
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
							{
								arr.map(
									function(obj) {
                    var url = '/venues/' + obj.id;
										return <div><a href={url}>{obj.name}</a><br/></div>;
									}
								)
							}
						</div>;
		}
		else {
			return <div className="FullVenues"></div>;
		}
	}
}

export default FullVenues;
