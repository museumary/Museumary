import React from 'react';
import Thumbnail from './Thumbnail'
import Pagination from './Pagination'

const defaultProps = {
    params: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "None",
        medium: "None"
    },

    work_url: 'http://api.museumary.me/work/',
    type_url: 'http://api.museumary.me/art_type?'
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
            if(params[key] !== nextProps[key]) {
                return this.loadPage(nextParams)
            }
        }
    }

    loadPage(params) {
        let arr = []
        for(var key in params) {
            if(params[key] !== 'None') {
                arr.push(key+'='+params[key])
            }
        }

        fetch(this.props.type_url+arr.join('&'))
            .then(result=>result.json())
            .then(items=> {
                this.loadWorks(items.objects, items.info.num_pages)
            })
    }

    loadWorks(artTypes, numPages) {
        Promise.all(artTypes.map((artType) => {
            const work_ids = artType.work_ids;
            const id = work_ids[Math.floor(Math.random()*work_ids.length)];

            return fetch(this.props.work_url+id)
        }))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(works => {
            const items = works.map((work, index) => {
                let type = artTypes[index]

                const url = '/types/' + type.id
                return (
                    <Thumbnail
                        name={type.name}
                        image_url={work.image_url}
                        url={url}
                        key={type.id} />
                );
            })

            this.setState({ items: items, numPages: numPages })
        })
    }

    render() {
        if(this.state.items) {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            {this.state.items}
                        </div>
                    </div>
                    <Pagination
                        page={this.props.params.page}
                        numPages={this.state.numPages}
                        changePage={this.props.changePage}
                    />
                </div>
            );
        }
        else {
            return <div />
        }
    }
}

TypesPage.defaultProps = defaultProps

export default TypesPage
