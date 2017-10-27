import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';


class FullArtists extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
  	fetch(`http://api-dot-organic-area-180723.appspot.com/artist`)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
		if(this.state.items.objects){
			var arr = [];
			this.state.items.objects.forEach(function(obj) {
				arr.push(obj);
			});
			return <div className="FullArtists">
						<div className="container">
							<div className="row">
									{
										arr.map(
											function(obj) {
												var url = '/artists/' + obj.id;
												return <div className="col-md-3">
															<Link to={url} activeClassName="active"><strong>{obj.name}</strong></Link><br/>
															<img src={obj.image_url} alt={obj.name} width="200" height="300"/><br/><br/>
													   </div>;
													   <br/>
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
			return <div className="FullArtists"></div>;
		}
	}
}

export default FullArtists;
