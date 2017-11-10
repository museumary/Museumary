import React from 'react';
import SelectFilter from './SelectFilter'

const defaultProps = {
    params: {
        order_by: "name",
        order: "ascending",
        startswith: "",
        country: ""
    },

    attributes: {
        name: "Name",
        country: "Country",
        city: "City",
        street: "Street"
    },

    country: {
        "None": "All",
        "USA": "USA",
        "Finland": "Finland",
        "New Zealand": "New Zealand",
    }
}

class VenuesFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.params;

        this.applyFilter = this.applyFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    applyFilter(event) {
        console.log("apply")

        if(event.target.name === "Reset") {
            this.setState(this.props.params)
            this.props.applyFilter(this.props.params);
        }
        else {
            console.log(this.state)
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
                    <SelectFilter
                        name="startswith"
                        value={this.state.startswith}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Order By: </strong>
                    <SelectFilter
                        name="order_by"
                        value={this.state.order_by}
                        attributes={this.props.attributes}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Country: </strong>
                    <SelectFilter
                        name="country"
                        value={this.state.country}
                        attributes={this.props.country}
                        handleChange={this.handleChange} />
                    &nbsp;&nbsp;
                    <strong> Order: </strong>
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

VenuesFilter.defaultProps = defaultProps;

export default VenuesFilter;