/*
    Filter Artists through its unique attributes:
        culture
*/

import React from 'react';

const ArtistFilter = ({ culture, handleChange }) => {
    return (
        <span>
            <strong> Culture: </strong>
            <input
                type="text"
                name="culture"
                value={culture}
                onChange={handleChange}
            />
        </span>
    );
}

export default ArtistFilter;