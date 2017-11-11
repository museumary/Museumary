import React from 'react';
import SelectFilter from './SelectFilter';
import MasterFilter from './MasterFilter';

const TypesFilter = MasterFilter(
    class TypesFilterClass extends React.Component {
        render() {
            return (
                <span>
                    <strong> Medium </strong>
                    <input
                        type="text"
                        name="medium"
                        value={this.props.medium}
                        onChange={this.props.handleChange}
                    />
                </span>
            );
        }
    }
);

export default TypesFilter;