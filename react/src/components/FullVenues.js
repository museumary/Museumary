import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail'

import Harvard from '../static/images/Harvard.jpg';
import Cooper from '../static/images/Cooper.jpg';
import Auckland from '../static/images/Auckland.jpg';
import Finnish from '../static/images/Finnish.jpg';
import Walters from '../static/images/Walters.jpg';

const MUSEUMS = [Harvard, Walters, Auckland, Cooper, Finnish]

class FullVenues extends React.Component {
    constructor(props) {
        super(props);
        this.state={items:[]};
    }

    componentDidMount(){
        fetch(`http://api.museumary.me/venue`)
            .then(result=>result.json())
            .then(items=>this.setState({ items }))
    }

    render() {
        if(this.state.items.objects){
            var arr = [];
            this.state.items.objects.forEach(function(obj) {
                const url = '/venues/' + obj.id
                const image_url = MUSEUMS[obj.id-1] //this.props.museum_images[obj.id-1]
                arr.push(<Thumbnail name={obj.name} image_url={image_url} url={url} key={obj.id} type="venue" description_id={obj.id}/>);
            });

            return (
                <div className="FullVenues">
                    <div className="container">
                        <div className="row">
                            {arr}
                        </div>
                        <br/>
                        <br/>
                    </div>
                </div>
            );
        }
        else {
            return <div className="FullVenues"></div>;
        }
    }
}

export default FullVenues;
