/*
    FullTypes Component that combines multiple components into a single full
    Page based on the specific model.
*/

import React from 'react';
import Page from './Page';
import FullPage from 'containers/FullPage';
import PageLoader from 'containers/PageLoader'
import { TypesFilter } from 'components/Filters'
import { TypesParams } from './DefaultParameters'

const TypesParser = ({ items, instance_url }) => {
    const parsedItems = items.map(item => {
        item.url = instance_url + item.id;
        item.details = [
            'Artists: ' + item.artist_ids.length,
            'Works: ' + item.artist_ids.length,
            'Mediums: ' + item.medium_ids.length
        ];

        return item;
    })

    return <Page items={ parsedItems } />
}

export default FullPage(TypesParams, PageLoader(TypesParser, TypesFilter));

