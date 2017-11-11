import React from 'react';
import SelectFilter from './SelectFilter';

function MasterFilter(WrappedFilter) {
    return class MasterFilterClass extends React.Component {
        constructor(props) {
            super(props);
            this.state = props.defaultParams;

            this.applyFilter = this.applyFilter.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        applyFilter(event) {
            if(event.target.name === "Reset") {
                this.setState(this.props.defaultParams)
                this.props.applyFilter(this.props.defaultParams)
            }
            else {
                this.props.applyFilter(this.state)
            }
        }

        handleChange(event) {
            this.setState({ [event.target.name]: event.target.value })
        }

        render() {
            const bindFunctions = {
                applyFilter: this.applyFilter,
                handleChange: this.handleChange
            }

            return (
                <div className="container">
                    <div align="middle">
                        <strong> Starts With: </strong>
                        <SelectFilter
                            name="startswith"
                            value={this.state.startswith}
                            handleChange={this.handleChange} />
                        &nbsp;&nbsp;
                        <WrappedFilter
                            {...this.state}
                            {...this.props}
                            {...bindFunctions} />
                         &nbsp;&nbsp;
                        <strong> Order By </strong>
                        <SelectFilter
                            name="order_by"
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
}

export default MasterFilter;


