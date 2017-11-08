import React from 'react';
import Thumbnail from '../Thumbnail';

const defaultProps = {
    params: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        art_type: "",
        medium: "",
        venue: ""
    },

    base_url: 'http://api.museumary.me/work/?',
    instance_url: '/works/'
}

class WorksPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            numPages: 0
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
            arr.push(key+'='+params[key])
        }

        fetch(this.props.base_url+arr.join('&'))
            .then(result=>result.json())
            .then(items=> {
                this.loadItems(items.objects, items.info.num_pages)
            })
    }

    loadItems(items, numPages) {
        const parsedItems = items.map(obj => {
            const obj_url = this.props.instance_url + obj.id
            const obj_name = obj.name.substring(0, 25) + (obj.name.length > 25 ? '...': '')

            return (
                <Thumbnail
                    name={obj_name}
                    image_url={obj.image_url}
                    url={obj_url}
                    key={obj.id} />
            );
        })

        this.setState({ items: parsedItems, numPages: numPages })
        this.props.changeNumPages(numPages);
    }

    render() {
        if(this.state.items) {
            return (
                <div className="container">
                    <div className="row">
                        {this.state.items}
                    </div>
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

WorksPage.defaultProps = defaultProps

export default WorksPage
