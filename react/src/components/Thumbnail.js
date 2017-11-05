import React from 'react';
import { Link } from 'react-router-dom';
import style from './Full.css';

export default class Thumbnail extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            image: '',
            url: ''
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            image: this.props.image,
            url: this.props.url
        })
    }

    render() {
        const name = this.state.name
        const image = this.state.image
        const url = this.state.url

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