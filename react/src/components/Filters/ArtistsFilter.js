import React from 'react';
import OrderByFilter from './OrderByFilter'

const defaultProps = {
    params: {
        order_by: "name",
        order: "ascending",
        startswith: "",
        culture: ""
    },

    attributes: {
        name: "Name",
        birth: "Birth",
        death: "Death",
        birthplace: "Birth Place",
        deathplace: "Death Place",
        culture: "Culture"
    }
}

class ArtistsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.params;

        this.applyFilter = this.applyFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    applyFilter(event) {
        if(event.target.name === "Reset") {
            this.cultureRef.value = "";
            this.startswithRef.value = "";

            this.setState(this.props.params)
            this.props.applyFilter(this.props.params)
        }
        else {
            this.props.applyFilter(this.state)
        }
    }

    handleChange(event) {
        let state = Object.assign({}, this.state);
        state[event.target.name] = event.target.value;

        this.setState(state)
    }

    render() {
        return (
            <div className="container">
                <div align="middle">
                    <strong> Starts With: </strong>
                    <input
                        type="text"
                        name="startswith"
                        ref={el => this.startswithRef = el}
                        onChange={this.handleChange}
                    />
                    &nbsp;&nbsp;
                    <strong> Culture </strong>
                    <input
                        type="text"
                        name="culture"
                        ref={el => this.cultureRef = el}
                        onChange={this.handleChange}
                    />
                    &nbsp;&nbsp;
                    <strong> Order By </strong>
                    <OrderByFilter
                        value={this.state.order_by}
                        attributes={this.props.attributes}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Order </strong>
                    <select
                        name="order"
                        value={this.state.order}
                        onChange={this.handleChange}>
                        <option value="ascending"> Ascending </option>
                        <option value="descending"> Descending </option>
                    </select>
                </div>
                <br/>
                <div>
                <button
                    type="button"
                    name="Apply"
                    onClick={this.applyFilter} >
                    Apply Filter
                </button>
                <button
                    type="button"
                    name="Reset"
                    onClick={this.applyFilter} >
                    Reset
                </button>
                </div>
                <br/>
            </div>
        );
    }
}

ArtistsFilter.defaultProps = defaultProps;

export default ArtistsFilter;