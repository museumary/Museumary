import React from 'react';
import MasterFilter from './MasterFilter';

const ArtistFilter = MasterFilter(
    class ArtistFilterClass extends React.PureComponent {
        render() {
            return (
                <span>
                    <strong> Culture </strong>
                    <input
                        type="text"
                        name="culture"
                        value={this.props.culture}
                        onChange={this.props.handleChange}
                    />
                </span>
            );
        }
});

export default ArtistFilter;