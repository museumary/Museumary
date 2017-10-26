import React from 'react';

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
										return <div><a href={url}>{obj.name}</a><br/></div>;
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
