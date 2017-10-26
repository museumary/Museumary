import React from 'react';

class Type extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const type_id = parseInt(this.props.match.params.number, 10)
  	fetch(`http://museumary.me/api/Type/` + type_id)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
    var type_obj = this.state.items;
		if(type_obj){
      //  Do all React code within this div. 'Type_obj' is the object that
      //  associated with this Type page, you should be able to access it
      //  like any other JSON
			return <div className="Type">
              {type_obj.name}
						</div>;
		}
		else {
			return <div className="Type"></div>;
		}
	}
}

export default Type;
