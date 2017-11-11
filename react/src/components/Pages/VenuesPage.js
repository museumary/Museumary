import React from 'react';
import Thumbnail from '../Thumbnail';

import Harvard from '../../static/images/Harvard.jpg';
import Cooper from '../../static/images/Cooper.jpg';
import Auckland from '../../static/images/Auckland.jpg';
import Finnish from '../../static/images/Finnish.jpg';
import Walters from '../../static/images/Walters.jpg';

const MUSEUMS = [Harvard, Walters, Auckland, Cooper, Finnish]

const defaultProps = {
    params: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        country: ""
    },

    base_url: 'http://api.museumary.me/venue?',
    instance_url: '/venue/'
}

class VenuesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
        }

        this.loadPage = this.loadPage.bind(this)
    }

    componentDidMount() {
        this.loadPage(this.props.params)
    }

    componentWillReceiveProps(nextProps) {
        const params = this.props.params
        const nextParams = nextProps.params

        for(var key in params) {
            if(params[key] !== nextParams[key]) {
                return this.loadPage(nextParams)
            }
        }
    }

    loadPage(params) {
        let arr = []
        for(var key in params) {
            const val = params[key].toString()
            if(val !== "" && val.toLowerCase() !== "none") {
                arr.push(key+'='+params[key])
            }
        }

        console.log('params to fetch: ' + arr)

        fetch('http://api.museumary.me/venue?'+arr.join('&'))
            .then(result=>result.json())
            .then(items=> {
                this.loadItems(items.objects);
            })
            .catch(error => console.log(error))
    }

    loadItems(items) {
        this.setState({ items: items })
    }

    render() {
        if(this.state.items) {
            let arr = [];
            this.state.items.forEach(function(obj) {
                const url = '/venues/' + obj.id
                const image_url = MUSEUMS[obj.id-1] //this.props.museum_images[obj.id-1]

                arr.push(
                    <Thumbnail
                        name={obj.name}
                        image_url={image_url}
                        url={url}
                        key={obj.id}
                        type="venue"
                        description_id={obj.id}/>
                );
            });

            return (
                <div className="container">
                    <div className="row">
                        {arr}
                    </div>
                    <br/>
                </div>
            );
        }
        else {
            return (
                <div><h1>Loading</h1></div>
            );
        }
    }
}

VenuesPage.defaultProps = defaultProps;

export default VenuesPage
