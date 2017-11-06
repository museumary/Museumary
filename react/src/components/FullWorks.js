import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail'

class FullWorks extends React.Component {
    constructor() {
        super();
        this.state={items:[]};
    }

    componentDidMount(){
        fetch(`http://api.museumary.me/work?entries_per_page=24`)
            .then(result=>result.json())
            .then(items=>this.setState({ items }))
    }

    render() {
        if(this.state.items.objects){
            var arr = [];
            this.state.items.objects.forEach(function(obj) {
                const url = '/works/'+obj.id
                const name = obj.name.substring(0, 25) + (obj.name.length > 25 ? '...': '')
                arr.push(<Thumbnail name={name} image_url={obj.image_url} url={url} key={obj.id} />);
            });

            return <div className="FullWorks">
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
            return <div className="FullWorks"></div>;
        }
    }
}

export default FullWorks;
