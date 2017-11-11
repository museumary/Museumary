import React from 'react';
import SelectFilter from './SelectFilter';
import MasterFilter from './MasterFilter';

const WorksFilter = MasterFilter(
    class WorksFilterClass extends React.PureComponent {
        render() {
            return (
                <span>
                    <strong> Art Type: </strong>
                    <input
                        type="text"
                        name="art_type"
                        value={this.props.art_type}
                        onChange={this.props.handleChange}
                    />
                    &nbsp;&nbsp;
                    <strong> Medium: </strong>
                    <input
                        type="text"
                        name="medium"
                        value={this.props.medium}
                        onChange={this.props.handleChange}
                    />
                    &nbsp;&nbsp;
                    <strong> Venue: </strong>
                    <SelectFilter
                        name="venue"
                        value={this.props.venue}
                        attributes={this.props.venuesList}
                        handleChange={this.props.handleChange} />
                    &nbsp;&nbsp;
                </span>
            );
        }
});

export default WorksFilter;