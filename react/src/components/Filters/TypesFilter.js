/*
    TypesFilter.js
        Filter ArtTypes through its unique attributes.

    State:
        Stateless Component

    Props / Attributes:
        medium -- the medium of the art type
        handleChange -- callback function to masterfilter to change state
*/

import React from 'react';

const TypesFilter = ({ medium, handleChange }) => {
    return (
        <span>
            <strong> Medium: </strong>
            <input
                type="text"
                name="medium"
                value={medium}
                onChange={handleChange}
            />
        </span>
    );
}

export default TypesFilter;