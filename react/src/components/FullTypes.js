import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';
import Thumbnail from './Thumbnail';


class FullTypes extends React.Component {
    constructor() {
        super();
        this.state={items:[]};
    }
    componentDidMount(){
        fetch(`http://api.museumary.me/art_type?entries_per_page=80`)
            .then(result=>result.json())
            .then(items=>this.setState({items}))
    }


    render() {
        if(this.state.items.objects){
            var arr = [];

            this.state.items.objects.forEach(function(obj) {
                const url = '/types/' + obj.id
                arr.push(<Thumbnail name={obj.name} image_url={obj.works} url={url} key={obj.id} />);
            });
            return <div className="FullTypes">
                        <div className="container">
                            <div className="row">
                                {arr}
                            </div>
                            <br/>
                            <br/>
                        </div>
                    </div>;
        }
        else {
            return <div className="FullTypes"></div>;
        }
    }
}

export default FullTypes;
