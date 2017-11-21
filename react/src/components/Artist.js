import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

class Artist extends React.Component {
    constructor() {
        super();
        this.state={
            items:[],
            work_arr:[]
        };
    }
    componentDidMount(){
        const artist_id = parseInt(this.props.match.params.number, 10)

        fetch(`http://api.museumary.me/artist/` + artist_id)
            .then(result=>result.json())
            .then(items=> {
                this.setState({ items })

                for (var i = 0, len = items.work_ids.length; i < len; i++) {
                    fetch('http://api.museumary.me/work/' + items.work_ids[i])
                        .then(result=>result.json())
                        .then(responseJson=>this.setState({work_arr: this.state.work_arr.concat([responseJson])}))
                }
            })
    }


    render() {
        var artist_obj = this.state.items;
        var work_list = this.state.work_arr;

        if(artist_obj && work_list && work_list.length > 0) {
            //  Do all React code within this div. 'artist_obj' is the object that
            //  associated with this artist page, you should be able to access it
            //  like any other JSON
            const carouselItems = work_list.slice(0, 10).map(function(obj) {
                return (
                    <Carousel.Item key={obj.id}>
                        <a href={"/works/"+obj.id} onClick={() => {}} >
                            <div>
                                <img className="workimage" src={obj.image_url} alt={obj.name} width="350" height="350" />
                            </div>
                        </a>
                        <Carousel.Caption>
                            <p>{obj.name}</p>
                            <p>{obj.date}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })

            var life = artist_obj.birth + " (" + artist_obj.birthplace + ")";
            if(artist_obj.death) {
                life += " - " + artist_obj.death + "(" + artist_obj.deathplace + ")";
            }

            var image_url = artist_obj.image_url;
            if(!image_url) {
                image_url = work_list[0].image_url;
            }

            let works = work_list.map(function(obj) {
                let url = '/works/' + obj.id
                return <div key={obj.id} ><Link to={url} >{obj.name}</Link><br/></div>;
            })

            return (
                <div className="Artist">
                    <h1>{artist_obj.name}</h1><br/>
                    <img src={image_url} alt={artist_obj.name} className="img-rounded" width="300" height="450"/><br/>
                    <strong>Culture: </strong>{artist_obj.culture}<br/>
                    <strong>Birth/Death: </strong>{life}<br/>
                    <h3><strong>Notable Works</strong></h3>
                    <br/>
                    <div className="CarouselInstance">
                            <Carousel>
                                {carouselItems}
                            </Carousel>
                        <br/>
                    </div>
                    {works}
                </div>
            );
        }
        else {
            return <div className="Artist"></div>;
        }
    }
}

export default Artist;
