/*
    FullVenues Component that combines multiple components into a single full
    Page based on the specific model.
*/

import React from 'react';
import Page from './Page';
import FullPage from 'containers/FullPage';
import PageLoader from 'containers/PageLoader'
import { VenuesFilter } from 'components/Filters'
import { VenuesParams } from './DefaultParameters'

/* Import Thumbnail Images for each venue */
import Harvard from 'static/images/Harvard.jpg';
import Cooper from 'static/images/Cooper.jpg';
import Auckland from 'static/images/Auckland.jpg';
import Finnish from 'static/images/Finnish.jpg';
import Walters from 'static/images/Walters.jpg';

/* Create MUSEUMS array to choose the image based on id */
const MUSEUMS = [Harvard, Walters, Auckland, Cooper, Finnish]

const VenuesParser = ({ items, instance_url }) => {
    const parsedItems = items.map(item => {
        item.url = instance_url + item.id;
        item.image_url = MUSEUMS[item.id-1]
        item.type = "venue"
        item.description_id = item.id

        return item;
    })

    return <Page items={parsedItems} />
}

export default FullPage(VenuesParams, PageLoader(VenuesParser, VenuesFilter));
