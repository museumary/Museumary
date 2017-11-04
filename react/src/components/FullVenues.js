import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';

import Harvard from '../static/images/Harvard.jpg';

import Cooper from '../static/images/Cooper.jpg';

import Auckland from '../static/images/Auckland.jpg';

import Finnish from '../static/images/Finnish.jpg';

import Walters from '../static/images/Walters.jpg';



class FullVenues extends React.Component {
    constructor() {
        super();
        this.state={items:[]};
    }
    componentDidMount(){
        fetch(`http://api.museumary.me/venue`)
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
                        <div className="container">
                            <div className="row">
                                {
                                    arr.map(
                                        function(obj) {
                                            var url = '/venues/' + obj.id;
                                            var img = "";
                                            var name = "";
                                            if(obj.name === "Harvard Art Museum")
                                            {
                                                img = Harvard;
                                                name = "Harvard Art Museum"
                                            }
                                            else if(obj.name === "Auckland Museum")
                                            {
          	                                    img = Auckland;
                                                name = "Auckland Museum"
                                            }
                                            else if(obj.name === "Finnish National Gallery")
                                            {
           	                                    img = Finnish;
           	                                    name = "Finnish National Gallery"
                                            }
                                            else if(obj.name === "The Walters Art Museum")
                                            {
                                                img = Walters;
                                                name = "The Walters Art Museum"
                                            }
                                            else
                                            {
                                                img = Cooper;
                                                name = "Cooper Hewitt"
                                            }

                                            return <div className="col-md-3">
                                                        <Link to={url} activeClassName="active"><strong>{name}</strong></Link>
                                                        <Link to={url} activeClassName="active">
                                                            <img src={img} className="img-rounded" width="200" height="300"/>
                                                        </Link>
                                                        <br/>
                                                        <br/>
                                                    </div>;
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
            return <div className="FullVenues"></div>;
        }
    }
}

export default FullVenues;
