import React from 'react';
import { Link } from 'react-router-dom';

class Work extends React.Component {
    constructor() {
        super();
        this.state={items:[]};
    }
    componentDidMount(){
        const work_id = parseInt(this.props.match.params.number, 10)
        fetch(`http://api.museumary.me/work/` + work_id)
            .then(result=>result.json())
            .then(items=> {
                this.setState({items})

                fetch('http://api.museumary.me/artist/' + items.artist_id)
                    .then(result=>result.json())
                    .then(responseJson=>this.setState({artist: responseJson}))

                fetch('http://api.museumary.me/venue/' + items.venue_id)
                    .then(result=>result.json())
                    .then(responseJson=>this.setState({venue: responseJson}))

                fetch('http://api.museumary.me/medium/' + items.medium_id)
                    .then(result=>result.json())
                    .then(responseJson=>this.setState({medium: responseJson}))
            })
    }


    render() {
        var work_obj = this.state.items;
        var artist_obj = this.state.artist;
        var venue_obj = this.state.venue;
        var medium_obj = this.state.medium;
        if(work_obj && artist_obj && venue_obj && medium_obj){
            //  Do all React code within this div. 'Work_obj' is the object that
            //  associated with this Work page, you should be able to access it
            //  like any other JSON
            return <div className="Work">
                      <h1>{work_obj.name}</h1><br/>
                      <Link to={'/artists/' + work_obj.artist_id} activeClassName="active">{artist_obj.name}</Link><br/>
                      {medium_obj.name}<br/>
                      <Link to={'/venues/' + work_obj.venue_id} activeClassName="active">{venue_obj.name}</Link><br/>
                      <img src={work_obj.image_url} />
                  </div>;
        }
        else {
            return <div className="Work"></div>;
        }
    }
}

export default Work;
