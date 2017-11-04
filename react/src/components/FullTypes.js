import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';


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
                arr.push(obj);
            });
            return <div className="FullTypes">
                        <div className="container">
                            <div className="row">
                                {
                                    arr.map(
                                        function(obj) {
                                            var url = '/types/' + obj.id;
                                            return <div className="col-md-3">
                                                        <Link to={url} activeClassName="active"><strong>{obj.name}</strong></Link>
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
            return <div className="FullTypes"></div>;
        }
    }
}

export default FullTypes;
