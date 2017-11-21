/*
    ArtistsFilter.js
        Filter Artists through its unique attributes.

    State:
        Stateless Component

    Props / Attributes:
        culture -- what is the artist's culture
        handleChange -- callback function to masterfilter to change state
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