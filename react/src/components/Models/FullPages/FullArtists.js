
import React from 'react';
import Page from 'components/Page';
import FullPage from 'containers/FullPage';
import PageLoader from 'containers/PageLoader'

import { ArtistsFilter } from 'components/Filters'
import { ArtistsParams } from 'DefaultParameters'

import Gentleman from 'static/images/Gentleman.png'

const ArtistsParser = ({ items, instance_url }) => {
    const parsedItems = items.map(item => {
        item.url = instance_url + item.id;
        item.image_url = item.image_url || Gentleman;
        item.details = ["Born: " + item.birth, "Died: " + (item.death ? item.death : "n/a"), "Culture: " + item.culture];

        return item;
    })

    return <Page items={ parsedItems } />
}

export default FullPage(ArtistsParams, PageLoader(ArtistsParser, ArtistsFilter));

