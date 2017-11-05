import React from 'react';
import { Link } from 'react-router-dom';

export default class Thumbnail extends React.Component {
    render() {
        const name = this.props.name
        const image = this.props.image_url
        const url = this.props.url

        return (
            <div className='col-md-3'>
                <Link to={url} activeClassName="active"><strong>{name}</strong></Link><br/>
                <Link to={url} activeClassName="active">
                    <img src={image} className="img-rounded" width="200" height="300"/>
                </Link>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}