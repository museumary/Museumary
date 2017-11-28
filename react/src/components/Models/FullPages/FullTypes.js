
import React from 'react';
import Page from './Page';
import FullPage from 'containers/FullPage';
import PageLoader from 'containers/PageLoader'
import { TypesFilter } from 'components/Filters'
import { TypesParams } from 'DefaultParameters'

const TypesParser = ({ items, instance_url }) => {
    const parsedItems = items.map(item => {
        item.url = instance_url + item.id;

        const works_count = item.work_ids.length
        const artists_count = item.artist_ids.length
        const medium_count = item.medium_ids.length

        item.details = ["Artists: " + artists_count, "Works: " + works_count, "Mediums: " + medium_count]

        return item;
    })

    return <Page items={ parsedItems } />
}

export default FullPage(TypesParams, PageLoader(TypesParser, TypesFilter));

