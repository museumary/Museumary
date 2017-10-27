import React from 'react';
import {Link} from 'react-router-dom';

class Artist extends React.Component {
	constructor() {
  	super();
 		this.state={items:[]};
  }
  componentDidMount(){
    const artist_id = parseInt(this.props.match.params.number, 10)
		this.setState({work_arr: []});
  	fetch(`http://api.museumary.me/artist/` + artist_id)
 		.then(result=>result.json())
    .then(items=> {
			this.setState({items})

			for (var i = 0, len = items.work_ids.length; i < len; i++) {
				fetch('http://api.museumary.me/work/' + items.work_ids[i])
				.then(result=>result.json())
				.then(responseJson=>this.setState({work_arr: this.state.work_arr.concat([responseJson])}))
			}

			console.log('here');
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
			var life = artist_obj.birth + " (" + artist_obj.birthplace + ")";
			if(artist_obj.death) {
				life += " - " + artist_obj.death + "(" + artist_obj.deathplace + ")";
			}
			var img_url = "";
			if(!artist_obj.image_url) {
				img_url = work_list[0].image_url;
			}
			else {
				img_url = artist_obj.image_url;
			}
			return <div className="Artist">
              <h1>{artist_obj.name}</h1><br/>
							{artist_obj.culture}<br/>
							{life}<br/>
							<h3>Works</h3><br/>
							{
								work_list.map(
									function(obj) {
										var url = '/works/' + obj.id;
										return <div><Link to={url} activeClassName="active">{obj.name}</Link><br/><br/></div>;
									}
								)
							}
							<img src={img_url} />
						</div>;
		}
		else {
			return <div className="Artist"></div>;
		}
	}
}

export default Artist;
