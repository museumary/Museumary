/*
    -- TypesFilter.js --
        Filter ArtTypes through its unique attributes.

    State:
        Stateless Component

    Props / Attributes:
        medium -- the medium of the art type
        handleChange -- callback function to masterfilter to change state
*/

import React from 'react';
import BaseFilter from './BaseFilter'
import MasterFilter from 'containers/MasterFilter'

const TypesFilter = BaseFilter(({ medium, handleChange }) => {
    return (
        <span>
            <strong> Medium: </strong>
            <input
                type='text'
                name='medium'
                value={medium}
                onChange={handleChange}
            />
        </span>
    );
});

// Export the filter enhanced by the BaseFilter
export default MasterFilter(TypesFilter);