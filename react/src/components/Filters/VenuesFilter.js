/*
    Filter Venues through its unique attributes:
        country
*/

import React from 'react';
import SelectFilter from './SelectFilter';

/*
    Define a Country list with its corresponding value
        key -- will be sent to the query
        value -- will show up on the UI

        NOTE: a 'None' key returns defaults to everything in the api
*/

const COUNTRY_LIST = {
    "None": "All",
    "USA": "USA",
    "Finland": "Finland",
    "New Zealand": "New Zealand"
}

const VenuesFilter = ({ country, handleChange }) => {
    return (
        <span>
            <strong> Country: </strong>
            <SelectFilter
                name="country"
                value={country}
                attributes={COUNTRY_LIST}
                handleChange={handleChange} />
        </span>
    );
}

export default VenuesFilter;