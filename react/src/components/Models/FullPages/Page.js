/* Page component that renders given items to Thumbnails */

import React from 'react';
import Thumbnail from 'components/Thumbnail';

const Page = ({ items }) => {
    return (
        <div className="container">
            <div className="row">
                { items.map(item => <Thumbnail key={item.id} {...item} />) }
            </div>
            <br/>
            <br/>
        </div>
    );
}

export default Page;