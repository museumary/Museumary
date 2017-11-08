import React from 'react';
import Thumbnail from './Thumbnail'
import Pagination from './Pagination'
import TypesPage from './TypesPage'
import style from './Select.css'

const defaultProps = {
    params: {
        page: 1,
        entries_per_page: 16,
        order_by: "name",
        order: "ascending",
        startswith: "None",
        medium: "None"
    }
}

class FullTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.params

        this.changePage = this.changePage.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    changePage(pageNumber) {
        this.setState({ page: pageNumber })
    }

    handleChange(event) {
        let state = this.state
        state[event.target.name] = event.target.value;

        this.setState(state)
    }

    render() {
        return (
            <div className="FullTypes">
                <div className="container">
                    <div className="select" align="right">
                        {"Order:  "}
                        <select
                            name="order"
                            value={this.state.order}
                            onChange={this.handleChange}>
                            <option value="ascending"> Ascending </option>
                            <option value="descending"> Descending </option>
                        </select>
                        <br/>
                        <br/>
                    </div>
                </div>
                <TypesPage
                    params={this.state}
                    changePage={this.changePage}
                />
            </div>
        );
    }
}

FullTypes.defaultProps = defaultProps

export default FullTypes;
