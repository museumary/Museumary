/*
    MasterFilter higher order component that wraps the other filters
        artists
        works
        venues
        types

    Contains all the default buttons / options for filtering.
        startswith -- alphabetical filter option
        order_by -- filter by the model's attributes
        order -- ascending or descending order
        apply -- signal that there is a need to apply the filter
        reset -- signal that things need to be reset back to default parameters

    State:
        The state of component is determined by the passed default parameters
        and determines what needs to be filtered

    Props:
        defaultParams -- the default parameters given by the model's FullPage
        applyFilter -- the callback function that allows the filter to change the FullPage state
        attributes -- the attributes of each model that can be filtered
*/

import React from 'react';
import SelectFilter from './SelectFilter';

function MasterFilter(WrappedFilter) {
    return class MasterFilterClass extends React.Component {
        /*
            constructor
                sets state to default parameters
                binds the functions -- applyFilter and handleChange
        */
        constructor(props) {
            super(props);
            this.state = props.defaultParams;

            // bind functions so the context is the masterfilter and not the calling component
            this.applyFilter = this.applyFilter.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        /*
            calls applyFilter from FullPage with the new parameters
        */
        applyFilter(event) {
            // if the event is to reset, set everything to the default parameters
            // state is immutable so we cant call this.state after setState
            if(event.target.name === "Reset") {
                this.setState(this.props.defaultParams)
                this.props.applyFilter(this.props.defaultParams)
            }
            else {
                this.props.applyFilter(this.state)
            }
        }

        /*
            handles state changes when there is a new value
        */
        handleChange(event) {
            this.setState({ [event.target.name]: event.target.value })
        }

        /*
            renders the component - current look is:

            <startswith> <wrapped filter> <order by> <order>
                        <apply filter> <reset>
        */
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
                        <strong> Order By: </strong>
                        <SelectFilter
                            name="order_by"
                            value={this.state.order_by}
                            attributes={this.props.attributes}
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
}

export default MasterFilter;


