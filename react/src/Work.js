import React from 'react';

class Work extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const work_id = parseInt(this.props.match.params.number, 10)
  	fetch(`http://museumary.me/api/work/` + work_id)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
    var work_obj = this.state.items;
		if(work_obj){
      //  Do all React code within this div. 'Work_obj' is the object that
      //  associated with this Work page, you should be able to access it
      //  like any other JSON
			return <div className="Work">
              <h1>{work_obj.name}</h1>
              <img src={ work_obj.image_url} />
						</div>;
		}
		else {
			return <div className="Work"></div>;
		}
	}
}

export default Work;
