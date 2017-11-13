/*
    Filter ArtTypes through its unique attributes:
        medium
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