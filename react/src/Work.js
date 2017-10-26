import React from 'react';
import { Link } from 'react-router-dom';

class Work extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const work_id = parseInt(this.props.match.params.number, 10)
  	fetch(`http://api-dot-organic-area-180723.appspot.com/work/` + work_id)
 		.then(result=>result.json())
    .then(items=> {
			this.setState({items})

			fetch('http://api-dot-organic-area-180723.appspot.com/artist/' + items.artist_id)
	    .then(result=>result.json())
	    .then(responseJson=>this.setState({artist: responseJson}))

			fetch('http://api-dot-organic-area-180723.appspot.com/venue/' + items.venue_id)
			.then(result=>result.json())
			.then(responseJson=>this.setState({venue: responseJson}))

			fetch('http://api-dot-organic-area-180723.appspot.com/medium/' + items.medium_id)
			.then(result=>result.json())
			.then(responseJson=>this.setState({medium: responseJson}))
		})
  }


  render() {
    var work_obj = this.state.items;
		if(work_obj){
      //  Do all React code within this div. 'Work_obj' is the object that
      //  associated with this Work page, you should be able to access it
      //  like any other JSON
			return <div className="Work">
              <h1>{work_obj.name}</h1><br/>
							<Link to={'/artists/' + work_obj.artist_id} activeClassName="active">artist</Link><br/>
							<Link to={'/types/' + work_obj.medium_id} activeClassName="active">medium</Link><br/>
							<Link to={'/venue/' + work_obj.venue_id} activeClassName="active">venue</Link><br/>
							<img src={work_obj.image_url} />
						</div>;
		}
		else {
			return <div className="Work"></div>;
		}
	}
}

export default Work;
