/*
    FullWorks Component that combines multiple components into a single full
    Page based on the specific model.
*/

import React from 'react';
import Page from './Page';
import FullPage from 'containers/FullPage';
import PageLoader from 'containers/PageLoader'
import { WorksFilter } from 'components/Filters'
import { WorksParams } from './DefaultParameters'

const WorksParser = ({ items, instance_url }) => {
    const parsedItems = items.map(item => {
        let { artist, date, venue } = item;

        item.url = instance_url + item.id;
        item.name = item.name.slice(0, 25) + (item.name.length > 25 ? '...' : '');
        item.details = [
            'Artist: ' + artist.slice(0, 7) + (artist.length > 7 ? '...' : ''),
            'Date: ' + date,
            'Venue: ' + venue.slice(0, 7)
        ];

        return item;
    })

    return <Page items={parsedItems} />
}

export default FullPage(WorksParams, PageLoader(WorksParser, WorksFilter));
