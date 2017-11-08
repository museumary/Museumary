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
                const numPages = items.info.num_pages;
                this.setState({ items: items, numPages: numPages }, this.loadWorks(items))
            })
    }

    loadWorks(items) {
        Promise.all(items.objects.map((artType) => {
            const work_ids = artType.work_ids;
            const id = work_ids[Math.floor(Math.random()*work_ids.length)];
            return fetch(this.props.work_url+id)
        }))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(works => {
            works.map((work, index) => {
                items.objects[index].image_url = work.image_url;
            })
        })
        .then(() => this.setState({ items: items }))
    }

    render() {
        if(this.state.items && this.state.items.objects) {
            let arr = [];
            this.state.items.objects.forEach(function(obj) {
                const url = '/types/' + obj.id
                arr.push(<Thumbnail name={obj.name} image_url={obj.image_url} url={url} key={obj.id}/>)
            });

            return (
                <div className="container">
                    <div className="row">
                        {arr}
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
