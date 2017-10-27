import React from 'react';

class Artist extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const artist_id = parseInt(this.props.match.params.number, 10)
  	fetch(`http://api.museumary.me/artist/` + artist_id)
 		.then(result=>result.json())
    .then(items=> {
			this.setState({items})
			var vararray = [];
			this.setState({work_arr: vararray})

			items.work_ids.forEach(function(work) {
				console.log(work);
				fetch('http://api.museumary.me/work/' + work)
				.then(result=>result.json())
				.then(responseJson=> {
					this.setState({
						work_arr: this.state.work_arr.concat([responseJson])
					})
				})
			})

			console.log(this.state.work_arr);
		})
  }


  render() {
    var artist_obj = this.state.items;
		var work_list = this.state.work_arr;
		if(artist_obj && work_list && work_list.length > 0){
			console.log(work_list);
      //  Do all React code within this div. 'artist_obj' is the object that
      //  associated with this artist page, you should be able to access it
      //  like any other JSON
			return <div className="Artist">
              <h1>{artist_obj.name}</h1>
						</div>;
		}
		else {
			return <div className="Artist"></div>;
		}
	}
}

export default Artist;
