import React from 'react';
import SelectFilter from './SelectFilter';
import MasterFilter from './MasterFilter';

const VenuesFilter = MasterFilter(
    class VenuesFilterClass extends React.PureComponent {
        render() {
            return (
                <span>
                    <strong> Country: </strong>
                    <SelectFilter
                        name="country"
                        value={this.props.country}
                        attributes={this.props.countryList}
                        handleChange={this.props.handleChange} />
                </span>
            );
        }
});

export default VenuesFilter;