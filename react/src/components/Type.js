import React from 'react';
import { Carousel } from 'react-bootstrap';
import style from './CarouselInstance.css';
import Thumbnail from './Thumbnail'

class Type extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            items:[],
            med_arr:[],
            work_arr:[]
        };
    }

    componentDidMount() {
        const type_id = parseInt(this.props.match.params.number, 10)

        fetch(`http://api.museumary.me/art_type/` + type_id)
            .then(result=>result.json())
            .then(items=>{
                for (var i = 0, len = Math.min(items.medium_ids.length, 10); i < len; i++) {
                    fetch('http://api.museumary.me/medium/' + items.medium_ids[i])
                        .then(result=>result.json())
                        .then(responseJson=>this.setState({med_arr: this.state.med_arr.concat([responseJson])}))
                }

                const length = items.work_ids.length; // Math.min(items.work_ids.length, 4);

                for (var j = 0; j < length; j++) {
                    fetch('http://api.museumary.me/work/' + items.work_ids[j])
                    .then(result=>result.json())
                    .then(responseJson=>this.setState({work_arr: this.state.work_arr.concat([responseJson])}))
                }
            })
    }

    render() {
        const type_obj = this.state.items;
        const med_list = this.state.med_arr;
        const work_list = this.state.work_arr;

        if(type_obj && work_list && med_list) {
            const carouselItems = work_list.slice(0, 4).map(function(obj) {
                return (
                    <Carousel.Item key={obj.id}>
                        <a href={"/works/"+obj.id} onClick={() => {}} >
                            <img className="carousel" src={obj.image_url} alt={obj.name} width="450" height="450" />
                        </a>
                        <Carousel.Caption>
                            <p>{obj.name}</p>
                            <p>{obj.date}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })

        //  Do all React code within this div. 'Type_obj' is the object that
        //  associated with this Type page, you should be able to access it
        //  like any other JSON
            return (
                <div className="Type">
                    <h1>{type_obj.name}</h1>
                    <br/>
                    <div className="container">
                        <div className="CarouselInstance">
                            <Carousel>
                                {carouselItems}
                            </Carousel>
                        <br/>
                    </div>
                    </div>
                    {
                        med_list.map(
                            function(obj) {
                                return <div key={obj.id}>{obj.name}<br/></div>;
                            }
                        )
                    }
                </div>
            );
        }
        else {
            return <div className="Type"></div>;
        }
    }
}

export default Type;
