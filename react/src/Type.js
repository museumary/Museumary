import React from 'react';

class Type extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[]};
  }
  componentDidMount(){
    const type_id = parseInt(this.props.match.params.number, 10)
  	fetch(`http://api-dot-organic-area-180723.appspot.com/medium/` + type_id)
 		.then(result=>result.json())
    .then(items=>this.setState({items}))
  }


  render() {
    var type_obj = this.state.items;
		if(type_obj){
      //  Do all React code within this div. 'Type_obj' is the object that
      //  associated with this Type page, you should be able to access it
      //  like any other JSON
      var video = "";
      var painting = "qWmF-bJj5Xs";
      var drawing = "5RVNzUPTlVs";
      var print = "GbBbhG40fDE";
      var ceramics = "XRDAGeJ_OIE";
      var photograph = "7ZVyNjKSr0M";
      if(type_obj.name === "painting") {
        video = painting;
      }
      if(name === "drawing") {
        video = drawing;
      }
      if(name === "print") {
        video = print;
      }
      if(name === "ceramics") {
        video = ceramics;
      }
      if(name === "photograph") {
        video = photograph;
      }

      video = "https://www.youtube.com/embed/" + video + "?autoplay=1"

			return <div className="Type">
                <h1>{type_obj.name}</h1>
                <iframe width="420" height="315" src={ video }></iframe><br/>
						 </div>;
		}
		else {
			return <div className="Type"></div>;
		}
	}
}

export default Type;
