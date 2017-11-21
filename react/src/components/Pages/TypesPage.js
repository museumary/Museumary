import React from 'react';
import Thumbnail from '../Thumbnail';

const defaultProps = {
    params: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "",
        medium: ""
    },

    work_url: 'http://api.museumary.me/work/',

    base_url: 'http://api.museumary.me/art_type?',
    instance_url: '/types/'
}

class TypesPage extends React.Component {
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
        Promise.all(items.map((artType) => {
            const work_ids = artType.work_ids;
            const id = work_ids[Math.floor(Math.random()*work_ids.length)];

            return fetch(this.props.work_url+id)
        }))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(works => {
            const parsedItems = works.map((work, index) => {
                let type = items[index]
                const url = this.props.instance_url + type.id
                const works_count = type.work_ids.length
                const artists_count = type.artist_ids.length
                const medium_count = type.medium_ids.length
                const details = ["Artists: " + artists_count, "Works: " + works_count, "Mediums: " + medium_count]

                return (
                    <Thumbnail
                        name={type.name}
                        image_url={work.image_url}
                        url={url}
                        key={type.id}
                        details={details}/>
                );
            })

            this.setState({ items: parsedItems, numPages: numPages })
            this.props.changeNumPages(numPages);
        })
    }

    render() {
        if(this.state.items) {
            return (
                <div className="container">
                    <div className="row">
                        {this.state.items}
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

TypesPage.defaultProps = defaultProps

export default TypesPage
